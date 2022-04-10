import {Form, Link, useActionData, useParams, useTransition} from "@remix-run/react";
import {createActivity} from "~/lib/createActivity.server";
import {ActionFunction, json, redirect} from "remix";

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();
    const [errors, activity] = await createActivity(body);
    console.log(errors, activity);
    if (errors) {
        const values = Object.fromEntries(body);
        return json({errors, values});
    }
    if (activity) {
        return redirect(`/activities/${activity.year}/${activity.month}`);
    }
    const now = new Date();
    return redirect(`/activities/${now.getFullYear()}/${now.getMonth() + 1}`);
}


export default () => {
    const params = useParams();
    const actionData = useActionData();
    const transition = useTransition();

    const year = params.year;
    const month = params.month;

    let date = `${year}-${month}-01`;
    if (actionData?.values.date) {
        date = actionData.values.date;
    }
    return (<div className="absolute top-0 left-0 w-screen h-screen bg-gray-800/90 flex justify-center">
        <div className="mt-10 h-2/3 bg-sky-100 border-2 border-sky-600 rounded w-2/3 relative">
            <div className="text-xl absolute top-0 right-2"><Link to={`../`}>&times;</Link></div>
            <h1 className="head">New Activity</h1>
            <Form method="post" className="p-6">
                <div><label>Date <input type="date" defaultValue={date} name="date"/></label></div>
                <div><label>Description *
                    <input type="text" name="description" required={true}
                           defaultValue={actionData?.values.description}
                           placeholder="Gammes majeures sur tout le manche" /></label></div>

                <div className="flex justify-end gap-4">
                    {actionData?.errors.description ? (<div className="btn-message text-red-700">{actionData.errors.description}</div>) : null}
                    {transition.state === "submitting" ? (<div className="btn-message">Please wait...</div>) : null}
                    {transition.state === "loading" ? (<div className="btn-message">loading...</div>) : null}
                    <Link className="btn" to={`../`}>Close</Link>
                    <button disabled={transition.state !== "idle"} className="btn btn-primary" type="submit">
                        {transition.state === "submitting" ? "Creating..." : "Create"}
                    </button>
                </div>

            </Form>

        </div>
    </div>);
}