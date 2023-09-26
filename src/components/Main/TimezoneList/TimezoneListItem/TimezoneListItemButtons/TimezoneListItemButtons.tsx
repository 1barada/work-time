import { FunctionComponent } from 'react';
import styles from './TimezoneListItemButtons.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { Timezone } from 'countries-and-timezones';

interface ITimezoneListItemButtonsProps {
    isHome: boolean,
    setHomeHandler: () => void,
    closeTimezoneHandler: () => void
}

const TimezoneListItemButtons: FunctionComponent<ITimezoneListItemButtonsProps> = ({
    isHome,
    setHomeHandler,
    closeTimezoneHandler
}) => {
    const openedTimezones = useSelector<RootState, (Timezone & {isHome: boolean;})[]>(state => state.timezonesSlice.openedTimezones);

    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                {openedTimezones.length !== 1 &&
                <div 
                    className={`${styles.button} ${styles.remove}`} 
                    title='Remove from the list'
                    onClick={closeTimezoneHandler}
                >
                    &#10006;
                </div>
                }
                {!isHome && 
                <div 
                    className={`${styles.button} ${styles.home}`} 
                    title='Mark as home'
                    onClick={setHomeHandler}
                >
                    &#8962;
                </div>
                }
            </div>
        </div>
    );
};

export default TimezoneListItemButtons;