import {Form} from "@remix-run/react";
import {Activity} from "~/lib/type";
import {useState} from "react";

function ActivityDay(props: { year: number, month: number, day: number }) {
    const d = String(props.month).padStart(2, '0')
    return (<span>{props.year}-{d}</span>)
}


function ActivityItem(props: { activity: Activity }) {
    const [deleting, setDeleting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [timer, setTimer] = useState(undefined as unknown as NodeJS.Timeout);
    const activity = props.activity;

    function startConfirmTimeout() {
        let timeout = setTimeout(() => {
            setConfirm(false)
            setTimer(undefined as unknown as NodeJS.Timeout)
        }, 3000);
        setTimer(timeout);
        setConfirm(true)
    }

    function startDeleting() {
        clearTimeout(timer);
        setTimer(undefined as unknown as NodeJS.Timeout)
        setDeleting(true);
    }

    return (<li className="ml-3 pl-3 mr-3 pr-3 pt-1 pb-1 odd:bg-sky-200 rounded flex items-center">
        <ActivityDay year={activity.year} month={activity.month} day={activity.day}/>
        <div className="grow pl-2">{activity.description}</div>
        <button type='submit' className={`text-xs ${confirm || deleting ? "hidden" : ""}`}
                onClick={startConfirmTimeout}>🗑
        </button>
        <Form method='delete' className={`text-xs ${confirm && !deleting ? "" : "hidden"}`}
              onSubmit={startDeleting}>
            <input type='hidden' name='id' value={activity.id}/>
            <button type='submit' className="bg-orange-500 text-stone-50 rounded p-1">Click to confirm</button>
        </Form>
        {deleting && confirm ? <div className="text-xs">Deleting...</div> : null}
    </li>)
}

export function ActivitiesListing(props: { activities: Activity[] }) {
    return <ul className="mt-4 mb-4">
        {props.activities.map(activity => <ActivityItem activity={activity} key={activity.id}/>)}
    </ul>;
}