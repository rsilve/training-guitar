import {db} from "~/utils/db.server";
import {Activity} from "~/lib/type";

type LoaderData = {
    activities: Array<Activity>;
};

export const getActivities = async (year: number, month: number) => {
    const data: LoaderData = {
        activities: await db.activity.findMany({
            where: {year, month}
        }),
    };
    //await new Promise(r => setTimeout(r, 2000));
    return data;
}