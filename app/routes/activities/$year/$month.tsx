import {Link, Outlet, useLoaderData, useMatches, useParams, useTransition} from "@remix-run/react";
import type {ActionFunction, LoaderFunction} from "remix";
import {json, redirect} from "remix";
import {db} from "~/utils/db.server";
import NewActivityButton from "~/components/NewActivityButton";
import {ActivitiesListing} from "~/components/ActivitiesListing";
import {getActivities} from "~/lib/getActivities";
import CalendarMonth from "~/components/CalendarMonth";
import type {Params} from "react-router";
import {nextMonth, prevMonth, urlDateFormat} from "~/utils/urlDateFormat";

export const loader: LoaderFunction = async ({params}) => {
    const data = await getActivities(Number.parseInt(params.year || "0"), Number.parseInt(params.month || "0"));
    return json(data);
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();
    const id = Number.parseInt(body.get("id") as string);
    let activity = await db.activity.findUnique({where: {id}});
    await db.activity.delete({where: {id}});
    let year, month
    if (!activity) {
        const today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
    } else {
        year = activity.year
        month = activity.month
    }
    return redirect(`/activities/${year}/${month}`);
}

export const handle = {
    breadcrumb: (params: Readonly<Params>) => {
        const {year, month} = params;
        const url = `/activities/${year}/${month}`;
        const title = (<Link to={url} className="breadcrumb-badge">{params.month}</Link>)
        return (<><span>/</span>{title}</>)
    },
    next: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const dateSegment = urlDateFormat(nextMonth({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&gt;&gt;</Link>)
        return (<>{title}</>)
    },
    previous: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const dateSegment = urlDateFormat(prevMonth({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&lt;&lt;</Link>)
        return (<>{title}</>)
    },
};

export default function $month() {
    const matches = useMatches();
    let isMonth = matches.length === 4;
    const params = useParams();
    const year = Number.parseInt(params.year || "0");
    const month = Number.parseInt(params.month || "0");
    let transition = useTransition();

    const data = useLoaderData();

    return (<>
            <Outlet/>
            {isMonth && <ActivitiesListing activities={data.activities}/>}
            <NewActivityButton disabled={transition.state !== "idle"}/>
            {isMonth && <CalendarMonth year={year} month={month} activities={data.activities}/>}
        </>
    );
}
