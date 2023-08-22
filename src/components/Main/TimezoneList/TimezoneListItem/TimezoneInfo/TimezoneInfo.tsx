import { Timezone } from 'countries-and-timezones';
import { FunctionComponent } from 'react';
import styles from './TimezoneInfo.module.css';

interface ITimezoneInfoProps {
    timezone: Timezone & {isHome: boolean}
}

const TimezoneInfo: FunctionComponent<ITimezoneInfoProps> = ({
    timezone
}) => {
    const splitIndex = timezone.name.lastIndexOf('/')
    const [region, city] = [timezone.name.slice(0, splitIndex), timezone.name.slice(splitIndex + 1)];

    return (
        <div className={styles.container}>
            <div className={styles.home}>{timezone.isHome ? 'home': '+10'}</div>
            <div className={styles.name}>
                <div className={styles.city}>{city}</div>    
                <div className={styles.region}>{region}</div>    
            </div>
            <div className={styles.offset}>{timezone.utcOffset}</div>
        </div>
    );
};

export default TimezoneInfo;