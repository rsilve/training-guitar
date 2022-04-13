import {Outlet} from "remix";

export default function Activities() {
    return (<div>
        <h1 className="head">Activities</h1>
        <Outlet/>
    </div>);
}