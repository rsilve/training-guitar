import {Link} from "@remix-run/react";

function monthGenerator(data:{_count: number, month: number}[], year?: string, ) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months.map((month, index) => {
        const count = data.find(d => d.month === index + 1)?._count || 0;
        return {
            title: month,
            url: `/activities/${year}/${index + 1}`,
            count
        };
    });
}

export default function ActivitiesYearListing({year, data}: {year?: string, data: {_count: number, month: number}[]}) {
    return  (<ol className="m-3">{monthGenerator(data, year).map(({title, url, count}, index) => {
        return (<li className="inline-block w-48 h-20 p-3 bg-blue-100 mr-1 mb-1 rounded relative">
            <Link to={url} key={index}>{title}
                {count > 0 &&
                    <span className="absolute bottom-3 right-3 bg-sky-600 text-stone-50 w-12 h-12 rounded-full justify-center inline-flex items-center">{count}</span>}
            </Link>
        </li>)
    })}</ol>);
}