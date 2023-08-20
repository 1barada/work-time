import { Timezone } from "countries-and-timezones";
import { FunctionComponent } from "react";
import TimezoneListItem from "./TimezoneListItem";

interface TimezoneListProps {
    timezones: Timezone[]
}
 
const TimezoneList: FunctionComponent<TimezoneListProps> = ({
    timezones
}) => {

    return (
        <div>
            {timezones.map((timezone) => 
                <TimezoneListItem timezone={timezone} key={timezone.name}/>
            )}
        </div>
    );
}
 
export default TimezoneList;