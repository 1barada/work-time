import { FunctionComponent } from 'react';
import styles from './HourLine.module.css';
import HourCell from './HourCell/HourCell';

interface IHourLineProps {
    
}

const HourLine: FunctionComponent<IHourLineProps> = () => {
    return (
        <div className={styles.container}>
            {Array.from({length: 24}, (_, index) => 
                <HourCell hour={index + 1} key={index}/>
            )}
        </div>
    );
};

export default HourLine;