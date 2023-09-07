import './App.css';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { TimezonesState } from './store/reducers/TimezonesSlice/TimezonesSlice';
import Main from './components/Main/Main';
import Warning from './components/Warning';

function App() {
  const {timezones, countries, openedTimezones} = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

  return (
    <div className="App container">
      <Warning/>
      <Main/>
    </div>
  );
}

export default App;
