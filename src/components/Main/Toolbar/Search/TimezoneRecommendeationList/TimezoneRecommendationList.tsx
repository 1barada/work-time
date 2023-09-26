import { Timezone } from 'countries-and-timezones';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef } from 'react';
import TimezoneRecommendationListItem from './TimezoneRecommendationListItem/TimezoneRecommendationListItem';
import styles from './TimezoneRecommendationList.module.css'
import {searchConstants} from '../../../../../data/constants';

interface ITimezoneRecommendationListProps {
    recommendedTimezones: Timezone[],
    topOffset: number,
    openTimezoneHandler: 
    (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        timezone: Timezone
    ) => void,
    setIsActive: Dispatch<SetStateAction<boolean>>
}

const TimezoneRecommendationList: FunctionComponent<ITimezoneRecommendationListProps> = ({
    recommendedTimezones,
    topOffset,
    openTimezoneHandler,
    setIsActive
}) => {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            e.stopPropagation();
            if (listRef.current && !listRef.current.contains(e.target as Node)) {
                setIsActive(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [listRef]);

    return (
        <ul 
            className={styles.container} 
            style={{
                width: searchConstants.timezoneRecommendationsWidth,
                top: topOffset
            }}
            ref={listRef}
        >
            {recommendedTimezones.length === 0 
                ?   <div className={styles.notFound}>
                        not found
                    </div>
                :   recommendedTimezones.map((timezone) => 
                        <TimezoneRecommendationListItem 
                            timezone={timezone} 
                            key={timezone.name}
                            openTimezoneHandler={openTimezoneHandler}
                        />
                    )
            }
        </ul>
    );
};

export default TimezoneRecommendationList;