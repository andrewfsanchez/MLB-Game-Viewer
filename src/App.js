//import './App.css';
import Schedule from './Schedule';
import GameView from './GameView';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { x } from '@xstyled/styled-components'


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
      <x.div position="absolute">
        <Calendar onChange={(v) =>{setDate(v); navigate('/schedule')}} value={date} />
      </x.div>
      <Routes>
        <Route path="MLB/schedule" element={<Schedule date={date}/>}/>
        <Route path="MLB/game/:gamepk" element={<GameView/>}/>
        <Route path='*' element={<Navigate to="MLB/schedule"/>}/>
      </Routes>
    </ThemeProvider>
  );
}


export default App;
