
export const nbDaysDateBeetween2Dates = (date1: Date, date2 = new Date()) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const nbDays = Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
    return nbDays;
}

export const nbMonthBeetween2Dates = (date1: Date, date2 = new Date()) => {
    return (
        date2.getMonth() -
        date1.getMonth() +
        12 * (date2.getFullYear() - date1.getFullYear())
    );
}