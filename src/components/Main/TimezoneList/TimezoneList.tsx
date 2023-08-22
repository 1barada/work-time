import { Timezone } from "countries-and-timezones";
import { FunctionComponent } from "react";
import TimezoneListItem from "./TimezoneListItem/TimezoneListItem";
import styles from './TimezoneList.module.css';

interface TimezoneListProps {
    timezones: (Timezone & {isHome: boolean})[]
}
 
const TimezoneList: FunctionComponent<TimezoneListProps> = ({
    timezones
}) => {

    return (
        <div className={styles.container}>
            {timezones.map((timezone, index) => 
                <TimezoneListItem timezone={timezone} index={index} key={timezone.name}/>
            )}
        </div>
    );
}
 
export default TimezoneList;