import {Link} from "@remix-run/react";

export default function CalendarMonthNav({year, month}: { year: number, month: number }) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;

    const formattedMonth = String(month).padStart(2, '0')
    return (<div className="p-3">
        <Link prefetch="render" to={`/activities/${prevYear}/${prevMonth}`}>&lt;&lt;</Link>&nbsp;
        {year}/{formattedMonth}&nbsp;
        <Link prefetch="render" to={`/activities/${nextYear}/${nextMonth}`}>&gt;&gt;</Link></div>);
}