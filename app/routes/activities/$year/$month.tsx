import {Outlet, useLoaderData, useParams, useTransition} from "@remix-run/react";
import {ActionFunction, json, LoaderFunction, redirect} from "remix";
import {db} from "~/utils/db.server";
import NewActivityButton from "~/components/NewActivityButton";
import {ActivitiesListing} from "~/components/ActivitiesListing";
import {getActivities} from "~/lib/getActivities";


export const loader: LoaderFunction = async ({params}) => {
    const data = await getActivities(Number.parseInt(params.year || "0"), Number.parseInt(params.month || "0"));
    return json(data);
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();
    const id = Number.parseInt(body.get("id") as string);
    let activity = await db.activity.findUnique({where: {id}});
    await db.activity.delete({where: {id}});
    return redirect(`/activities/${activity.year}/${activity.month}`);
}

export default function $month() {
    const params = useParams();
    const year = params.year;
    const month = params.month;
    let transition = useTransition();

    const data = useLoaderData();

    return (<div>
        <Outlet/>
        <ActivitiesListing activities={data.activities}/>
        <NewActivityButton disabled={transition.state !== "idle"}/>
        <div>Calendrier {year}/{month}</div>
    </div>);
}
