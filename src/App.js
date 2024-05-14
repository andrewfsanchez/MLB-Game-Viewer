//import './App.css';
import Schedule from './Schedule';
import GameView from './GameView';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


import {
  defaultTheme,
  ThemeProvider,
  Preflight,
} from '@xstyled/styled-components'
import {Route, Routes, Navigate} from 'react-router-dom';

const theme = {
  ...defaultTheme
}

function App() {
  const [date, setDate] = useState(()=>{console.log('start'); return new Date();});
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <div className='calendar-container'>
        <Calendar onChange={(v) =>{setDate(v); navigate('/schedule')}} value={date} />
      </div>
      <Routes>
        <Route path="/schedule" element={<Schedule date={date}/>}/>
        <Route path="/game/:gamepk" element={<GameView/>}/>
        <Route path='*' element={<Navigate to="/schedule"/>}/>
      </Routes>
    </ThemeProvider>
  );
}


export default App;
