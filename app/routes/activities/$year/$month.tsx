import {Outlet, useLoaderData, useParams, useTransition} from "@remix-run/react";
import {ActionFunction, json, LoaderFunction, redirect} from "remix";
import {db} from "~/utils/db.server";
import NewActivityButton from "~/components/NewActivityButton";
import {ActivitiesListing} from "~/components/ActivitiesListing";
import {getActivities} from "~/lib/getActivities";
import CalendarMonth from "~/components/CalendarMonth";

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

export default function $month() {
    const params = useParams();
    const year = Number.parseInt(params.year || "0");
    const month = Number.parseInt(params.month || "0");
    let transition = useTransition();

    const data = useLoaderData();

    return (<>
        <Outlet/>
        <ActivitiesListing activities={data.activities}/>
        <NewActivityButton disabled={transition.state !== "idle"}/>
        <CalendarMonth year={year} month={month} activities={data.activities}/>
        </>
);
}
