import { FunctionComponent, useEffect, useState } from 'react';
import {Timezone} from 'countries-and-timezones';
import styles from './TimezoneListItem.module.css';
import HourLine from './HourLine/HourLine';
import TimezoneInfo from './TimezoneInfo/TimezoneInfo';
import TimezoneListItemButtons from './TimezoneListItemButtons/TimezoneListItemButtons';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { closeTimezone, setHomeTimezone } from '../../../../store/reducers/TimezonesSlice/TimezonesSlice';
import ITimeForTimezones from '../../../../models/ITimeForTimezones';
import { useSelector } from 'react-redux';

interface ITimezoneListItemProps {
    timezone: Timezone & {isHome: boolean},
    index: number,
    gmt: ITimeForTimezones
}

const TimezoneListItem: FunctionComponent<ITimezoneListItemProps> = ({
    timezone,
    index,
    gmt
}) => {
    const [time, setTime] = useState<ITimeForTimezones>({
        hours: 0,
        minutes: 0
    });
    const [offsetFromHome, setOffsetFromHome] = useState<ITimeForTimezones>({
        hours: 0,
        minutes: 0
    });
    const homeTimezone = useSelector<RootState, Timezone>(state => state.timezonesSlice.homeTimezone!);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const offset = timezone.utcOffset;
        const hoursOffset = Math.floor(offset / 60);
        const minutesOffset = offset - (hoursOffset * 60);

        setTime({
            hours: gmt.hours + hoursOffset,
            minutes: gmt.minutes + minutesOffset
        });
    }, [gmt]);

    useEffect(() => {
        const offset = timezone.utcOffset - homeTimezone.utcOffset;
        const hours = Math.floor(offset / 60);
        const minutes = offset - (hours * 60);

        setOffsetFromHome({hours, minutes});
    }, [homeTimezone]);

    function setHomeHandler() {
        dispatch(setHomeTimezone(timezone.name));
    }

    function closeTimezoneHandler() {
        dispatch(closeTimezone(timezone.name));
    }

    return (
        <div className={`${styles.container} ${index % 2 === 1 && styles.even}`}>
            <TimezoneListItemButtons 
                isHome={timezone.isHome}
                setHomeHandler={setHomeHandler}
                closeTimezoneHandler={closeTimezoneHandler}
            />
            <TimezoneInfo 
                timezone={timezone}
                time={time}
                offsetFromHome={offsetFromHome}
            />
            <HourLine
                timezone={timezone}
                time={time}
                homeTimezone={homeTimezone}
                offsetFromHome={offsetFromHome}
            />
        </div>
    );
};

export default TimezoneListItem;