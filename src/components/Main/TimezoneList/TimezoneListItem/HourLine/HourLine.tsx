import { FunctionComponent, useEffect, useState } from 'react';
import styles from './HourLine.module.css';
import HourCell from './HourCell/HourCell';
import ITimeForTimezones from '../../../../../models/ITimeForTimezones';
import { Timezone } from 'countries-and-timezones';

interface IHourLineProps {
    timezone: (Timezone & {isHome: boolean}),
    time: ITimeForTimezones,
    homeTimezone: Timezone,
    offsetFromHome: ITimeForTimezones
}

const HourLine: FunctionComponent<IHourLineProps> = ({
    timezone,
    time,
    homeTimezone,
    offsetFromHome
}) => {
    const [nums, setNums] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

    useEffect(() => {
        if (!timezone.isHome) {
            const arr1 = nums.slice(0, offsetFromHome.hours);
            const arr2 = nums.slice(offsetFromHome.hours, nums.length);
            setNums([...arr2, ...arr1]);
        }
    }, [offsetFromHome]);

    return (
        <div className={styles.container}>
            {nums.map((index) => 
                <HourCell hour={index} key={index}/>
            )}
        </div>
    );
};

export default HourLine;