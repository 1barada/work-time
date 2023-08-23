import { FunctionComponent, useEffect, useState } from 'react';
import styles from './HourCell.module.css';

interface IHourCellProps {
    hour: number,
    minutes: number
}

const HourCell: FunctionComponent<IHourCellProps> = ({
    hour,
    minutes
}) => {
    const [timeOfTheDay, setTimeOfTheDay] = useState<string>('');

    useEffect(() => {
        setTimeOfTheDay(`${
            hour < 6 ? styles.night : 
            hour < 8 ? styles.evening : 
            hour < 18 ? styles.day : 
            hour < 22 ? styles.evening : 
            styles.night
        }`);
    }, [hour]);

    return (
        <div className={`${styles.container} ${timeOfTheDay} ${hour === 0 ? styles.first : hour === 23 ? styles.last : ''}`}>
            <div>{hour}</div>
            <div className={styles.minutes}>{minutes || ''}</div>
        </div>
    );
};

export default HourCell;