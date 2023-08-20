import { Timezone } from 'countries-and-timezones';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef } from 'react';
import TimezoneRecommendationListItem from '../TimezoneRecommendationListItem/TimezoneRecommendationListItem';
import styles from './TimezoneRecommendationList.module.css'
import {styleConstants} from '../../../../data/constants';

interface ITimezoneRecommendationListProps {
    recommendedTimezones: Timezone[],
    topOffset: number,
    setIsActive: Dispatch<SetStateAction<boolean>>
}

const TimezoneRecommendationList: FunctionComponent<ITimezoneRecommendationListProps> = ({
    recommendedTimezones,
    topOffset,
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
                width: styleConstants.timezoneRecommendationsWidth,
                top: topOffset
            }}
            ref={listRef}
        >
            {recommendedTimezones.length === 0 
                ?   <div className={styles.notFound}>
                        not found
                    </div>
                :   recommendedTimezones.map((timezone) => 
                        <TimezoneRecommendationListItem timezone={timezone} key={timezone.name}/>
                    )
            }
        </ul>
    );
};

export default TimezoneRecommendationList;