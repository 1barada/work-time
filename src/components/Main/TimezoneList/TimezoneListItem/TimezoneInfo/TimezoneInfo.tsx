import { Timezone } from 'countries-and-timezones';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './TimezoneInfo.module.css';
import ITimeForTimezones from '../../../../../models/ITimeForTimezones';
import timeToString from '../../../../../utils/timeToString';
import timeOffsetToString from '../../../../../utils/timeOffsetToString';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface ITimezoneInfoProps {
    timezone: Timezone & {isHome: boolean},
    time: ITimeForTimezones,
    offsetFromHome: ITimeForTimezones,
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

const TimezoneInfo: FunctionComponent<ITimezoneInfoProps> = ({
    timezone,
    time,
    offsetFromHome,
    dragHandleProps
}) => {
    const [city, setCity] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    useEffect(() => {
        const splitIndex = timezone.name.lastIndexOf('/')
        setCity(timezone.name.slice(splitIndex + 1));
        setRegion(timezone.name.slice(0, splitIndex));
    }, [timezone]);

    return (
        <div className={styles.container} {...dragHandleProps}>
            <div 
                className={`${styles.home} ${timezone.isHome && styles.is_home}`}
                title={timezone.isHome 
                    ? 'Home timezone' 
                    : `${timeOffsetToString(offsetFromHome)} hours from home`}
            >
                {timezone.isHome ? '⌂' : timeOffsetToString(offsetFromHome)}
            </div>
            <div className={styles.name}>
                <div className={styles.city}>{city}</div>    
                <div className={styles.region}>{region}</div>    
            </div>
            <div className={styles.offset}>{timeToString(time)}</div>
        </div>
    );
};

export default TimezoneInfo;