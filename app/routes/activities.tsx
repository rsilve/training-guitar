import {Outlet} from "remix";

export default function Activities() {
    return (<div className="flex flex-col h-screen max-h-screen">
        <h1 className="head">Activities</h1>
        <Outlet/>
    </div>);
}