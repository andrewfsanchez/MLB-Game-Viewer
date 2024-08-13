//import './App.css';
import Home from './Home';
import Mlb from './Mlb';
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
  const [active, setActive] = useState(false);
  //const [date, setDate] = useState(()=>{console.log('start'); return new Date();});
  let navigate = useNavigate();

  document.body.style.backgroundColor = "#325962"

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <x.div position='relative' color="white" onClick={()=>setActive(false)}>
        <Routes>
          <Route path="home" element={<Home/>}/>
          <Route path="mlb/*" element={<Mlb/>}/>
          <Route path='*' element={<Navigate to="home"/>}/>
        </Routes>
      </x.div>
    </ThemeProvider>
  );
}


export default App;
