import {Link} from "@remix-run/react";

export default function NewActivityButton(props: {disabled: boolean}) {
    const now = new Date();
    const enabledButton = (<Link to={`/activities/${now.getFullYear()}/${now.getMonth() + 1}/new`}>
        <div className="bg-sky-600 text-stone-50 w-20 h-20 rounded-full justify-center inline-flex items-center">
            NEW
        </div>
    </Link>)
    const disabledButton = (<div className="bg-gray-600 text-stone-50 w-20 h-20 rounded-full justify-center inline-flex items-center">
            NEW
        </div>)
    return <div className="text-center bg-blue-100 pt-3 pb-3">
        {props.disabled ? disabledButton : enabledButton}
    </div>
}