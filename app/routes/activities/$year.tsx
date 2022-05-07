import type { LoaderFunction} from "remix";
import {json, Outlet} from "remix";
import type {Params} from "react-router";
import {getYearActivities} from "~/lib/getActivities";
import {Link, useLoaderData, useMatches, useParams} from "@remix-run/react";
import ActivitiesYearListing from "~/components/ActivitiesYearListing";
import {nextYear, prevYear, urlDateFormat} from "~/utils/urlDateFormat";

export const loader: LoaderFunction = async ({params}) => {
    const data = await getYearActivities(Number.parseInt(params.year || "0"));
    return json(data);
};

export const handle = {
    breadcrumb: (params: Readonly<Params>) => {
        const {year} = params;
        const url = `/activities/${year}`;
        const title = (<Link to={url} className="breadcrumb-badge">{params.year}</Link>)
        return (<>{title}</>)
    },
    next: (params: Readonly<Params>) => {
        let {year, month, day} = params;
        const dateSegment = urlDateFormat(nextYear({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&gt;&gt;&gt;</Link>)
        return (<>{title}</>)
    },
    previous: (params: Readonly<Params>) => {
        const {year, month, day} = params;
        const dateSegment = urlDateFormat(prevYear({year, month, day}))
        const url = `/activities/${dateSegment}`;
        const title = (<Link to={url}>&lt;&lt;&lt;</Link>)
        return (<>{title}</>)
    },
};

export default function $year() {
    const matches = useMatches();
    let isYear = matches.length === 3;
    const params = useParams()

    let data = useLoaderData();


    return (<>
        <Outlet/>
        {isYear && <ActivitiesYearListing data={data} year={params.year}/>}
    </>);
}