//import './App.css';
import Schedule from './Schedule';
import GameView from './GameView';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { fontSize, x } from '@xstyled/styled-components'
import Icon from './img/calander.png'


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
  const [active, setActive] = useState(false);
  const [date, setDate] = useState(()=>{console.log('start'); return new Date();});
  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <x.div position="sticky" backgroundColor="white" display="flex" top={0} boxSizing={"border-box"} borderBottomColor="#313238" borderBottom="1">
        <x.div ml="5%">
          {active && <Calendar onChange={(v) =>{setDate(v); navigate('/schedule'); setActive(false)}} value={date} />}
          {!active && <img src={Icon} onClick={()=>setActive(true)}/>}
        </x.div>
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
