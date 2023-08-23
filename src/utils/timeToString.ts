import ITimeForTimezones from "../models/ITimeForTimezones";

export default function timeToString(time: ITimeForTimezones) {
    const hours: string = time.hours.toString().length === 1 
        ? `0${time.hours}`
        : `${time.hours}`;
    const minutes: string = time.minutes.toString().length === 1 
        ? `0${time.minutes}` 
        : `${time.minutes}`;

        return hours + ':' + minutes;
}