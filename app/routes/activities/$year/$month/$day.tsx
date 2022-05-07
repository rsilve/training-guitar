import {Link, Outlet, useLoaderData} from "@remix-run/react";
import {ActivitiesListing} from "~/components/ActivitiesListing";
import type { LoaderFunction} from "remix";
import {json} from "remix";
import {getDayActivities} from "~/lib/getActivities";
import type {Params} from "react-router";
import {nextDate, prevDate, urlDateFormat} from "~/utils/urlDateFormat";


export const loader: LoaderFunction = async ({params}) => {
    const data = await getDayActivities(Number.parseInt(params.year || "0"),
        Number.parseInt(params.month || "0"),
        Number.parseInt(params.day || "0"));
    return json(data);
};

export const handle = {
    breadcrumb: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const url = `/activities/${year}/${month}/${day}`;
        let title = (<Link to={url} className="breadcrumb-badge">{params.day}</Link>)
        return (<><span>/</span>{title}</>)
    },
    next: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const dateSegment = urlDateFormat(nextDate({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&gt;</Link>)
        return (<>{title}</>)
    },
    previous: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const dateSegment = urlDateFormat(prevDate({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&lt;</Link>)
        return (<>{title}</>)
    }
};


export default function $day() {
    const data = useLoaderData();

    return (<>
            <Outlet/>
            <ActivitiesListing activities={data.activities}/>
        </>
    );
}