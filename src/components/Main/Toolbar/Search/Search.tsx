import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { clearRecommendations, searchTimezone, openTimezone } from '../../../../store/reducers/TimezonesSlice/TimezonesSlice';
import { useSelector } from 'react-redux';
import { Timezone } from 'countries-and-timezones';
import styles from './Search.module.css';
import { searchConstants } from '../../../../data/constants';
import TimezoneRecommendationList from './TimezoneRecommendeationList/TimezoneRecommendationList';

interface ISearchProps {
    
}

const Search: FunctionComponent<ISearchProps> = ({

}) => {
    const [searchText, setSearchText] = useState<string>('');
    const [isRecomendationsActive, setIsRecomendationsActive] = useState<boolean>(false);
    const recomendedTimezones = useSelector<RootState, Timezone[]>(state => state.timezonesSlice.recomendedTimezones);
    const dispatch = useDispatch<AppDispatch>();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!searchText.trim()) {
            dispatch(clearRecommendations());
            return;
        } 

        
        const searchDelay = setTimeout(() => {
            dispatch(searchTimezone(searchText));
            setIsRecomendationsActive(true);
        }, 300);

        return () => clearTimeout(searchDelay);
    }, [searchText]);

    function onSearchTextChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    function openTimezoneHandler(e: React.MouseEvent<HTMLLIElement, MouseEvent>, timezone: Timezone) {
        dispatch(openTimezone(timezone.name));
        setIsRecomendationsActive(false);
        setSearchText('');
    }

    return (
        <div 
            className={styles.container}
            style={{height: searchConstants.searchHeight}}
            ref={searchRef}
        >
            <input
                className={styles.input} 
                value={searchText}
                type="text"
                placeholder='timezone name or code'
                onChange={onSearchTextChange}
            />
            {isRecomendationsActive && 
            <TimezoneRecommendationList
                recommendedTimezones={recomendedTimezones}
                topOffset={searchConstants.searchHeight + (searchRef.current?.offsetTop || 0)}
                setIsActive={setIsRecomendationsActive}
                openTimezoneHandler={openTimezoneHandler}
            />}
        </div>
    );
};

export default Search;