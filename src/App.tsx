import { useEffect } from 'react';
import './App.css';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { TimezonesState } from './store/reducers/TimezonesSlice/TimezonesSlice';
import Main from './components/Main/Main';

function App() {
  const {timezones, countries, openedTimezones} = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

  return (
    <div className="App container">
      <p 
        className='container'
        style={{textAlign: 'center'}}
      >
        <span style={{color: '#fbff00'}}>&#x26A0;</span> 
        This app does not use DST(daylight save time)<br/>
        This means that the time in some time zones will be differ from the real time (max difference: 2 hours).
      </p>
      <Main/>
    </div>
  );
}

export default App;
