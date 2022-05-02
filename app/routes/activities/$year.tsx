import {json, LoaderFunction, Outlet} from "remix";
import {Params} from "react-router";
import {getYearActivities} from "~/lib/getActivities";
import {Link, useLoaderData, useMatches, useParams} from "@remix-run/react";
import ActivitiesYearListing from "~/components/ActivitiesYearListing";

export const loader: LoaderFunction = async ({params}) => {
    console.log("Loading year", params.year);
    const data = await getYearActivities(Number.parseInt(params.year || "0"));
    return json(data);
};

export const handle = {
    breadcrumb: (params: Readonly<Params<string>>) => {
        const {year} = params;
        const url = `/activities/${year}`;
        const title = (<Link to={url} className="breadcrumb-badge">{params.year}</Link>)
        return (<>{title}</>)},
};

export default function $year() {
    const matches = useMatches();
    let isYear = matches.length === 3;
    const params = useParams()

    let data = useLoaderData();


    return (<>
        <Outlet />
        {isYear && <ActivitiesYearListing data={data} year={params.year} />}
    </>);
}