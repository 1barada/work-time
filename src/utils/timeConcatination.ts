import ITimeForTimezones from "../models/ITimeForTimezones";

export default function timeConcatination(time1: ITimeForTimezones, time2: ITimeForTimezones): ITimeForTimezones {
    let hours = time1.hours + time2.hours;
    let minutes = time1.minutes + time2.minutes;

    while(minutes > 59) {
        hours++;
        minutes -= 60;
    }

    hours = hours % 24;

    console.log(hours, minutes)

    return {
        hours: hours < 0 ? 24 + hours : hours,
        minutes: minutes < 0 ? 60 + minutes : minutes
    };
}