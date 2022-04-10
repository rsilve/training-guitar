import {db} from "~/utils/db.server";

type ValidationError = { date: string, description: string };
type Result = {year: number, month: number, day: number};

function validateActivity(body: FormData) {
    let returnErrors = false;
    let errors = {} as ValidationError;
    if (!body.has("date")) {
        errors.date = "Date is required";
        returnErrors = true
    }
    if (!body.has("description") ||  !body.get("description") || body.get("description").length < 3) {
        errors.description = "Description is required";
        returnErrors = true;
    }
    if (returnErrors) {
        return errors;
    }

    return undefined;
}

export async function createActivity(body: FormData): Promise<[ValidationError |undefined, Result | undefined]> {
    let date = new Date();

    const errors = validateActivity(body);

    if (errors) {
        return [errors, undefined];
    }
    const dateStr = body.get("date") as string;
    if (dateStr) {
        date = new Date(dateStr);
    }
    const activity = await db.activity.create({data: {description: body.get("description") as string,
            year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}});
    //await new Promise(r => setTimeout(r, 2000));
    return [undefined, activity];
}
