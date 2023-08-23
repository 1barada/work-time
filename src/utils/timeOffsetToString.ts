import ITimeForTimezones from "../models/ITimeForTimezones";

export default function timeForTimezonesToString({hours, minutes}: ITimeForTimezones) {
    const num = Math.abs(hours) + Math.abs(minutes / 60);
    console.log(hours, minutes, num)
    const symbol = hours < 0 ? '-' : minutes < 0 ? '-' : '+';

    return symbol + num.toString().substring(0, num < 10 ? 4 : 5);
}