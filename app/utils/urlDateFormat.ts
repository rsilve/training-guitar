type DateAsNumber = { yearNumber: number, monthNumber: number, dayNumber: number }
const ZERO = { yearNumber: 0, monthNumber: 0, dayNumber: 0 }
type DateAsString = { year?: string, month?: string, day?: string }

function getDaysInMonth(year: number, month?: number): number {
    return new Date(year, month || 0, 0).getDate();
}


export function urlDateFormat({yearNumber, monthNumber, dayNumber}: DateAsNumber): string {
    if (dayNumber) {
        return `${yearNumber}/${monthNumber}/${dayNumber}`;
    } else if (monthNumber) {
        return `${yearNumber}/${monthNumber}`;
    } else if (yearNumber) {
        return `${yearNumber}`;
    } else {
        return '';
    }
}


function toNumber({year, month, day}: DateAsString): DateAsNumber {
    return {
        yearNumber: year ? Number.parseInt(year) : 0,
        monthNumber: month ? Number.parseInt(month) : 0,
        dayNumber: day ? Number.parseInt(day) : 0
    }
}

export function nextDate({year, month, day}: DateAsString): DateAsNumber {
    const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
    if (year && month && day) {
        const nextDay = dayNumber + 1;
        if (nextDay > getDaysInMonth(yearNumber, monthNumber)) {
            const nextMonthNumber = (monthNumber || 0) + 1;
            if (nextMonthNumber > 12) {
                return {yearNumber: yearNumber + 1, monthNumber: 1, dayNumber: 1};
            } else {
                return {yearNumber, monthNumber: nextMonthNumber, dayNumber: 1};
            }
        } else {
            return {yearNumber, monthNumber, dayNumber: nextDay};
        }
    } else {
        return ZERO;
    }
}

export function prevDate({year, month, day}: DateAsString): DateAsNumber {
    const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
    if (year && month && day) {
        const prevDay = dayNumber - 1;
        if (prevDay < 1) {
            const prevMonthNumber = (monthNumber || 0) - 1;
            if (prevMonthNumber < 1) {
                return {yearNumber: yearNumber - 1, monthNumber: 12, dayNumber: getDaysInMonth(yearNumber - 1, 12)};
            } else {
                return { yearNumber, monthNumber: prevMonthNumber, dayNumber: getDaysInMonth(yearNumber, prevMonthNumber)};
            }

        } else {
            return {yearNumber, monthNumber, dayNumber: prevDay};
        }
    } else {
        return ZERO;
    }
}


export function nextYear({year, month, day}: DateAsString): DateAsNumber {
    const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
    if (year) {
        return {yearNumber: yearNumber + 1, monthNumber, dayNumber};
    } else {
        return ZERO;
    }
}

export function prevYear({year, month, day}: DateAsString): DateAsNumber {
    const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
    if (year) {
        return {yearNumber: yearNumber - 1, monthNumber, dayNumber};
    } else {
        return ZERO;
    }
}

export function nextMonth({year, month, day}: DateAsString): DateAsNumber {
    if (year && month) {
        const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
        const next = monthNumber + 1;
        if (next > 12) {
            return {yearNumber: yearNumber + 1, monthNumber: 1, dayNumber};
        } else {
            return {yearNumber, monthNumber: next, dayNumber};
        }
    } else {
        return ZERO;
    }
}

export function prevMonth({year, month, day}: DateAsString): DateAsNumber {
    if (year && month) {
        const {yearNumber, monthNumber, dayNumber} = toNumber({year, month, day});
        const prev = monthNumber - 1;
        if (prev < 1) {
            return {yearNumber: yearNumber - 1, monthNumber: 12, dayNumber};
        } else {
            return {yearNumber: yearNumber, monthNumber: prev, dayNumber};
        }
    } else {
        return ZERO;
    }
}
