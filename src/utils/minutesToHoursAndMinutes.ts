import ITimeForTimezones from "../models/ITimeForTimezones";

export default function minutesToHoursAndMinutes(minutes: number): ITimeForTimezones {
    let hours = Math.floor(minutes / 60);
    const minutesOutput = minutes - (hours * 60);
    
    if (hours > 23) {
        hours %= 24;
    }
    
    return {
        hours: hours,
        minutes: minutesOutput
    };
}