import { Timezone } from 'countries-and-timezones';
import { FunctionComponent, useState } from 'react';
import styles from './TimezoneRecommendationListItem.module.css';
import { PointerEvent } from 'react';

interface ITimezoneRecommendationListItemProps {
    timezone: Timezone,
    openTimezoneHandler: 
    (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        timezone: Timezone
    ) => void,
}

const TimezoneRecommendationListItem: FunctionComponent<ITimezoneRecommendationListItemProps> = ({
    timezone,
    openTimezoneHandler
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
            onClick={e => openTimezoneHandler(e, timezone)}
        >
            {timezone.name}
        </li>
    );
};

export default TimezoneRecommendationListItem;