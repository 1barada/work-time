import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TimezonesState } from '../../store/reducers/TimezonesSlice/TimezonesSlice';
import TimezoneList from './TimezoneList';
import styles from './Main.module.css';
import Toolbar from './Toolbar/Toolbar';

interface IMainProps {
    
}

const Main: FunctionComponent<IMainProps> = () => {
    const {timezones, countries, openedTimezones} = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

    return (
        <div className={styles.container}>
            <Toolbar/>
            <TimezoneList timezones={timezones}/>
        </div>
    );
};

export default Main;