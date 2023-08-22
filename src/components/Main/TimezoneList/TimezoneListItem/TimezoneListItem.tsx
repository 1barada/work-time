import { FunctionComponent } from 'react';
import {Timezone} from 'countries-and-timezones';
import styles from './TimezoneListItem.module.css';
import HourLine from './HourLine/HourLine';
import TimezoneInfo from './TimezoneInfo/TimezoneInfo';

interface ITimezoneListItemProps {
    timezone: Timezone & {isHome: boolean},
    index: number
}

const TimezoneListItem: FunctionComponent<ITimezoneListItemProps> = ({
    timezone,
    index
}) => {
    return (
        <div className={`${styles.container} ${index % 2 === 1 && styles.even}`}>
            <TimezoneInfo timezone={timezone}/>
            <HourLine/>
        </div>
    );
};

export default TimezoneListItem;