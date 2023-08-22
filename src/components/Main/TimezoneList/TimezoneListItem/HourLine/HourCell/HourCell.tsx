import { FunctionComponent, useEffect, useState } from 'react';
import styles from './HourCell.module.css';

interface IHourCellProps {
    hour: number
}

const HourCell: FunctionComponent<IHourCellProps> = ({
    hour
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
        <div className={`${styles.container} ${timeOfTheDay} ${hour === 1 ? styles.first : hour === 24 ? styles.last : ''}`}>
            {hour}
        </div>
    );
};

export default HourCell;