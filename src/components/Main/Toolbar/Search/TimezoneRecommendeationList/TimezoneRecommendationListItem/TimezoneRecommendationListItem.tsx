import { Timezone } from 'countries-and-timezones';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './TimezoneRecommendationListItem.module.css';
import { PointerEvent } from 'react';
import ITimeForTimezones from '../../../../../../models/ITimeForTimezones';
import minutesToHoursAndMinutes from '../../../../../../utils/minutesToHoursAndMinutes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import timeToString from '../../../../../../utils/timeToString';

interface ITimezoneRecommendationListItemProps {
    timezone: Timezone,
    openTimezoneHandler: 
    (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        timezone: Timezone
    ) => void,
}

const TimezoneRecommendationListItem: FunctionComponent<ITimezoneRecommendationListItemProps> = ({
    timezone,
    openTimezoneHandler
}) => {
    const [isPointed, setIsPointed] = useState<boolean>(false);
    const [time, setTime] = useState<ITimeForTimezones>({
        hours: 0,
        minutes: 0
    });
    const gmt = useSelector<RootState, ITimeForTimezones>(state => state.timezonesSlice.gmt);
    
    useEffect(() => {
        setTime(minutesToHoursAndMinutes(timezone.utcOffset + ((gmt.hours * 60) + gmt.minutes)));
    }, [gmt]);

    function onPointerEnter(e: PointerEvent<HTMLLIElement>) {
        setIsPointed(true);
    }

    function onPointerLeave(e: PointerEvent<HTMLLIElement>) {
        setIsPointed(false);
    }

    return (
        <li 
            className={`${styles.container} ${isPointed && styles.pointed}`} 
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={e => openTimezoneHandler(e, timezone)}
        >
            <div>{timezone.name}</div>
            <div>{timeToString(time)}</div>
        </li>
    );
};

export default TimezoneRecommendationListItem;