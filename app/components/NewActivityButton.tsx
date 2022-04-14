import {Link} from "@remix-run/react";

export default function NewActivityButton(props: {disabled: boolean}) {
    const now = new Date();
    const enabledButton = (<Link to={`/activities/${now.getFullYear()}/${now.getMonth() + 1}/new`}>
        <div className="new-activity-button">
            NEW
        </div>
    </Link>)
    const disabledButton = (<div className="new-activity-button disabled">
            NEW
        </div>)
    return <div className="text-center bg-blue-100 pt-3 pb-3">
        {props.disabled ? disabledButton : enabledButton}
    </div>
}