import { Timezone } from 'countries-and-timezones';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './TimezoneInfo.module.css';
import ITimeForTimezones from '../../../../../models/ITimeForTimezones';
import timeToString from '../../../../../utils/timeToString';
import timeOffsetToString from '../../../../../utils/timeOffsetToString';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import ISelectedTime from '../../../../../models/ISelectedTime';
import timeConcatination from '../../../../../utils/timeConcatination';

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
    const selectedTime = useSelector<RootState, ISelectedTime | null>(state => state.hourlineSelectorSlice.selectedTime);

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
            <div 
                className={styles.name}
                style={{ 
                    flex: selectedTime ? '0 0 30%' : '0 0 60%'
                }}
            >
                <div className={styles.city}>{city}</div>    
                <div className={styles.region}>{region}</div>    
            </div>
            <div 
                className={styles.offset}
                style={{
                    flex: selectedTime ? '0 0 50%' : '0 0 20%'
                }}
            >
                {selectedTime ? 
                    `${timeToString(timeConcatination(selectedTime.from, offsetFromHome))} - ${timeToString(timeConcatination(selectedTime.to, offsetFromHome))}` :
                    timeToString(time)
                }
            </div>
        </div>
    );
};

export default TimezoneInfo;