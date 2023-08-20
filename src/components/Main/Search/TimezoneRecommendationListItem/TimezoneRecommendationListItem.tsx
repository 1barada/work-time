import { Timezone } from 'countries-and-timezones';
import { FunctionComponent, useState } from 'react';
import styles from './TimezoneRecommendationListItem.module.css';
import { PointerEvent } from 'react';

interface ITimezoneRecommendationListItemProps {
    timezone: Timezone
}

const TimezoneRecommendationListItem: FunctionComponent<ITimezoneRecommendationListItemProps> = ({
    timezone
}) => {
    const [isPointed, setIsPointed] = useState<boolean>(false);

    function onPointerEnter(e: PointerEvent<HTMLLIElement>) {
        setIsPointed(true);
    }

    function onPointerLeave(e: PointerEvent<HTMLLIElement>) {
        setIsPointed(false);
    }

    return (
        <li 
            className={`${styles.container} ${isPointed && styles.pointed}`} 
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            {timezone.name}
        </li>
    );
};

export default TimezoneRecommendationListItem;