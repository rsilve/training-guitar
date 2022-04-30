import {Outlet} from "remix";
import {useMatches} from "@remix-run/react";
import {Params} from "react-router";

function breadCrumb(matches: {handle: any, params: Params<string>}[]) {
    return (<div className="breadcrumb">
        <ol>
            {matches
                .filter(
                    (match) =>
                        match.handle && match.handle.breadcrumb
                )
                // render breadcrumbs!
                .map((match, index) => (
                    <li key={index} className="inline-block">
                        {match.handle.breadcrumb(match.params)}
                    </li>
                ))}
        </ol>
    </div>)
}

export default function Activities() {
    const matches = useMatches();

    return (<div className="flex flex-col h-screen max-h-screen">
        <h1 className="head">Activities</h1>
        {breadCrumb(matches)}
        <Outlet/>
    </div>);
}