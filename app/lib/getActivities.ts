import {db} from "~/utils/db.server";
import type {Activity} from "~/lib/type";

type LoaderData = {
    activities: Array<Activity>;
};

export const getActivities = async (year: number, month: number) => {
    const data: LoaderData = {
        activities: await db.activity.findMany({
            where: {year, month},
            orderBy: [
                {year: 'asc'},
                {month: 'asc'},
                {day: 'asc'},
            ],
        }),
    };
    return data;
}

export const getDayActivities = async (year: number, month: number, day: number) => {
    const data: LoaderData = {
        activities: await db.activity.findMany({
            where: {year, month, day},
            orderBy: [
                {year: 'asc'},
                {month: 'asc'},
                {day: 'asc'},
            ],
        }),
    };
    return data;
}

export const getYearActivities = async (year: number) => {
    const data: LoaderData = await db.activity.groupBy({
        by: ['month'],
        where: {year},
        _count: true,
    });
    return data;
}