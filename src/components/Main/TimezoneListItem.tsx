import { FunctionComponent } from 'react';
import {Timezone} from 'countries-and-timezones';;

interface ITimezoneListItemProps {
    timezone: Timezone
}

const TimezoneListItem: FunctionComponent<ITimezoneListItemProps> = ({timezone}) => {
    return (
        <div>
            <div>{timezone.name}</div>
            <div>{timezone.utcOffset}</div>
        </div>
    );
};

export default TimezoneListItem;