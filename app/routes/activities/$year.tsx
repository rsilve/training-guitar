import {Outlet} from "remix";
import {Params} from "react-router";

export const handle = {
    breadcrumb: (params: Readonly<Params<string>>) => (
        <span className="breadcrumb-badge">{params.year}</span>
    ),
};


export default function $year() {
    return (<Outlet />);
}