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
        <tr>
            <td>sun.</td>
            <td>mon.</td>
            <td>tue.</td>
            <td>wed.</td>
            <td>thu.</td>
            <td>fri.</td>
            <td>sat.</td>
        </tr>
    )
}

export default function CalendarMonth({year, month}: { year: number, month: number }) {
    const days = daysGenerator({year, month})
    const rows = []
    for (let row = 0; row < 6; row++) {
        const cells = []
        for (let cell = 0; cell < 7; cell++) {
            const day = days[row] && days[row][cell] ? days[row][cell] : 0
            cells.push(<td key={cell}><span>{day}</span></td>)
        }
        rows.push(<tr key={row}>{cells}</tr>)
    }
    return (<div className="p-6">
        <table className="w-full">
            <tbody>
            {week_days()}
            {rows}
            </tbody>
        </table>
    </div>);
}