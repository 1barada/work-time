import { FunctionComponent } from 'react';

const Warning: FunctionComponent = () => {
    return (
        <p 
            className='container'
            style={{textAlign: 'center'}}
        >
            <span style={{color: '#fbff00'}}>&#x26A0;</span> 
            This app does not use DST(daylight save time)<br/>
            This means that the time in some time zones will be differ from the real time (max difference: 2 hours).
        </p>
    );
};

export default Warning;