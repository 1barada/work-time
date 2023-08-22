import { FunctionComponent } from 'react';
import styles from './Toolbar.module.css';
import Search from './Search/Search';

interface IToolbarProps {
    
}

const Toolbar: FunctionComponent<IToolbarProps> = () => {
    return (
        <div className={styles.container}>
            <Search/>
        </div>
    );
};

export default Toolbar;