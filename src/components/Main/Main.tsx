import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TimezoneList from './TimezoneList/TimezoneList';
import styles from './Main.module.css';
import Toolbar from './Toolbar/Toolbar';
import { Timezone } from 'countries-and-timezones';

interface IMainProps {
    
}

const Main: FunctionComponent<IMainProps> = () => {
    const openedTimezones = useSelector<RootState, (Timezone & {isHome: boolean;})[]>(state => state.timezonesSlice.openedTimezones);

    return (
        <div className={styles.container}>
            <Toolbar/>
            <TimezoneList timezones={openedTimezones}/>
        </div>
    );
};

export default Main;