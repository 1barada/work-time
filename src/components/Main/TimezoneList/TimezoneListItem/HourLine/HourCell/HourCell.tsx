import { FunctionComponent, useEffect, useState } from 'react';
import styles from './HourCell.module.css';
import { hourlineConstants } from '../../../../../../data/constants';

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
        <li 
            className={`${styles.container} ${timeOfTheDay} ${hour === 0 ? styles.first : hour === 23 ? styles.last : ''}`}
            style={{
                height: hourlineConstants.cellHeight,
                width: hourlineConstants.cellWidth
            }}
        >
            <div>{hour}</div>
            <div className={styles.minutes}>{minutes < 0 ? 60 + minutes : minutes || ''}</div>
        </li>
    );
};

export default HourCell;