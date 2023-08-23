import { Timezone } from "countries-and-timezones";
import { FunctionComponent, useEffect, useState } from "react";
import TimezoneListItem from "./TimezoneListItem/TimezoneListItem";
import styles from './TimezoneList.module.css';
import ITimeForTimezones from "../../../models/ITimeForTimezones";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { updateGmt } from "../../../store/reducers/TimezonesSlice/TimezonesSlice";

interface TimezoneListProps {
    timezones: (Timezone & {isHome: boolean})[]
}
 
const TimezoneList: FunctionComponent<TimezoneListProps> = ({
    timezones
}) => {
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const minuteInterval = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(minuteInterval);
    }, []);

    useEffect(() => {
        const offset = date.getTimezoneOffset();
        const hoursOffset = Math.floor(offset / 60);
        const minutesOffset = (hoursOffset * 60) - offset;

        dispatch(updateGmt({
            hours: date.getHours() + hoursOffset,
            minutes: date.getMinutes() + minutesOffset
        }));
    }, [date]);

    return (
        <div className={styles.container}>
            {timezones.map((timezone, index) => 
                <TimezoneListItem 
                    timezone={timezone} 
                    index={index} 
                    key={timezone.name}
                />
            )}
        </div>
    );
}
 
export default TimezoneList;