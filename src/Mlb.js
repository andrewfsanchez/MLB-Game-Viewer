//import './App.css';
import Schedule from './Schedule';
import GameView from './GameView';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { x } from '@xstyled/styled-components'
import Icon from './img/calander.png'


import {
  defaultTheme,
  ThemeProvider,
} from '@xstyled/styled-components'
import {Route, Routes, Navigate} from 'react-router-dom';

const theme = {
  ...defaultTheme
}




function Mlb() {
  const [active, setActive] = useState(false);
  const [date, setDate] = useState(()=>{console.log('start'); return new Date();});
  let navigate = useNavigate();


  return (
    <ThemeProvider theme={theme}>

      <x.div position='sticky' top={0} zIndex={2} onClick={()=>setActive(false)} display="flex" justifyContent='space-between' alignItems='center' boxSizing={"border-box"} borderBottom="1" bg='#623b32'>
        <x.img top={0} src={Icon} alt="Calendar Icon" cursor='pointer' onClick={(e)=>{setActive(!active); e.stopPropagation()}} bg='#623b32'/>
        <x.div display="flex" mr="5%" onClick={()=>navigate('/home')} cursor='pointer' fontFamily={`"Segoe UI", Roboto, Oxygen, sans-serif`} fontSize='18px'>
          About the creator
        </x.div>
      </x.div>
      
      <x.div position='relative' color="white" onClick={()=>setActive(false)}>
        <x.div position='absolute' onClick={(e)=>e.stopPropagation()}>
          {active && <Calendar onChange={(v) =>{setDate(v); navigate('/mlb/schedule'); setActive(false)}} value={date} />}
        </x.div>
        <Routes>
          <Route path="schedule" element={<Schedule date={date}/>}/>
          <Route path="game/:gamepk" element={<GameView/>}/>
          <Route path='*' element={<Navigate to="/mlb/schedule"/>}/>
        </Routes>
      </x.div>

      
    </ThemeProvider>
  );
}


export default Mlb;
