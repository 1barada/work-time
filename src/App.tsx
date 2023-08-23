import { useEffect } from 'react';
import './App.css';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { TimezonesState } from './store/reducers/TimezonesSlice/TimezonesSlice';
import Main from './components/Main/Main';

function App() {
  const {timezones, countries, openedTimezones} = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

  useEffect(() => {console.log(timezones)}, [timezones])

  return (
    <div className="App container">
      <Main/>
    </div>
  );
}

export default App;
