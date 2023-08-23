import ITimeForTimezones from "../models/ITimeForTimezones";

export default function timeForTimezonesToString({hours, minutes}: ITimeForTimezones) {
    const num = Math.abs(hours) + Math.abs(minutes / 60);
    const symbol = hours < 0 ? '-' : minutes < 0 ? '-' : '+';

    return symbol + num.toString().substring(0, num < 10 ? 4 : 5);
}