import {Link, Outlet, useLoaderData} from "@remix-run/react";
import {ActivitiesListing} from "~/components/ActivitiesListing";
import {json, LoaderFunction} from "remix";
import {getDayActivities} from "~/lib/getActivities";
import {Params} from "react-router";


export const loader: LoaderFunction = async ({params}) => {
    const data = await getDayActivities(Number.parseInt(params.year || "0"),
        Number.parseInt(params.month || "0"),
        Number.parseInt(params.day || "0"));
    return json(data);
};

export const handle = {
    breadcrumb: (params: Readonly<Params<string>>) => {
        const {year, month, day} = params;
        const url = `/activities/${year}/${month}/${day}`;
        let title = (<Link to={url} className="breadcrumb-badge">{params.day}</Link>)
        return (<><span>/</span>{title}</>)},
};


export default function $day() {
    const data = useLoaderData();

    return (<>
            <Outlet/>
            <ActivitiesListing activities={data.activities}/>
        </>
    );
}