import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getActivities().map((activity) => {
            return db.activity.create({ data: activity });
        })
    );
}

seed();

function getActivities() {
    // shout-out to https://icanhazdadjoke.com/

    return [
        {
            description: "Road worker",
            year: 2022,
            month: 4,
            day: 6
        },
        {
            description: "Frisbee",
            year: 2022,
            month: 4,
            day: 7
        },
        {
            description: "Trees",
            year: 2022,
            month: 4,
            day: 8
        }
    ];
}