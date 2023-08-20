import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TimezonesState } from '../../store/reducers/TimezonesSlice/TimezonesSlice';
import Search from './Search/Search';
import TimezoneList from './TimezoneList';
import styles from './Main.module.css';

interface IMainProps {
    
}

const Main: FunctionComponent<IMainProps> = () => {
    const {timezones, countries, openedTimezones} = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

    return (
        <div className={styles.container}>
            <Search/>
            <TimezoneList timezones={timezones}/>
        </div>
    );
};

export default Main;