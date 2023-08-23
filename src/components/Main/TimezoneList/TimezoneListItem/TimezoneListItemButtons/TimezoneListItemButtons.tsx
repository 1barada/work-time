import { FunctionComponent } from 'react';
import styles from './TimezoneListItemButtons.module.css';

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
    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                <div 
                    className={`${styles.button} ${styles.remove}`} 
                    title='Remove from the list'
                    onClick={closeTimezoneHandler}
                >
                    &#10006;
                </div>
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