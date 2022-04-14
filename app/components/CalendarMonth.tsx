import CalendarMonthNav from "~/components/CalendarMonthNav";
import {Activity} from "~/lib/type";

function daysGenerator(d: { year: number, month: number }): number[][] {
    const today = new Date(d.year, d.month - 1, 1);
    const today_month = today.getMonth()
    let day = 1;
    let week = 0;
    let date = new Date(today.getFullYear(), today.getMonth(), day, 12, 0, 0)
    let month = date.getMonth()
    const days: number[][] = []
    while (month === today_month && day < 32) {
        if (!days[week]) {
            days[week] = []
        }
        days[week][date.getDay()] = date.getDate()
        day++;
        date = new Date(today.getFullYear(), today.getMonth(), day, 12, 0, 0)
        month = date.getMonth()
        week = date.getDay() ? week : week + 1
    }
    return days
}

function week_days() {
    return (
        <>
            <div className="cell">sun.</div>
            <div className="cell">mon.</div>
            <div className="cell">tue.</div>
            <div className="cell">wed.</div>
            <div className="cell">thu.</div>
            <div className="cell">fri.</div>
            <div className="cell">sat.</div>
        </>
    )
}

export default function CalendarMonth({year, month, activities}: { year: number, month: number, activities: Activity[] }) {
    const days = daysGenerator({year, month})
    const cells = []
    for (let row = 0; row < 6; row++) {
        for (let cell = 0; cell < 7; cell++) {
            const day = days[row] && days[row][cell] ? days[row][cell] : 0
            if (day) {
                let activity = activities.filter(a => a.day == day).pop();
                console.log(activity, day)
                const className = activity ? "cell activity" : "cell"
                cells.push(<div key={row * 10 + cell} className={className}><span className="day">{day}</span></div>)
            } else {
                cells.push(<div key={row * 10 + cell} className="cell"/>)
            }

        }
    }
    return (<div className="calendar-month">
        <div className="col-span-7"><CalendarMonthNav year={year} month={month}/></div>
        {week_days()}
        {cells}
    </div>);
}