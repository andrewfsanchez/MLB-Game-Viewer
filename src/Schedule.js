import {useState, useRef, useEffect} from 'react';
import GameList from './GameList';

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
  
const scheduleURL = (startDate, endDate) => {
    const formatedDateStart = formatDate(startDate);
    const formatedDateEnd = formatDate(endDate);
  
    return "https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate="+formatedDateStart+"&endDate="+formatedDateEnd;
}
  
const scrapeGameDates = (json) => {
    const games = {}
  
    for(let i = 0; i<json.dates.length; i++){
      const todaysGames=new Array(json.dates[i].games.length);
      for(let k=0; k<json.dates[i].games.length; k++){
        todaysGames[k] = 
          { gamepk:     json.dates[i].games[k].gamePk,
            home:       json.dates[i].games[k].teams.home.team.name, 
            away:       json.dates[i].games[k].teams.away.team.name,
            homeScore:  json.dates[i].games[k].teams.home.score,
            awayScore:  json.dates[i].games[k].teams.away.score
          }
      }
      games[json.dates[i].date] = todaysGames;
    }
  
    return games;
}
  
async function getGamesWithinSixMonths (date) {
    const startOfMonth = new Date(date.getFullYear()-1, date.getMonth()+7, 1);
    const endOfMonth = new Date(date.getFullYear()+1, date.getMonth()-5, 0);
  
    const gamesURL = scheduleURL(startOfMonth, endOfMonth);
    //return games;
  
    const response = await fetch(gamesURL);
    const json = await response.json();
    const games = scrapeGameDates(json);
    
    return games;  
}
  
const over4MonthsApart= (date1, date2) =>{
    return Math.abs(date1.getTime()-date2.getTime())>=10519200000
}
  
const dateToString = (date) => {
    let month = '0'
    let day = '0'
    if(date.getMonth() <=8){
      month = month + (date.getMonth()+1)
    } else {
      month = ''+(date.getMonth()+1)
    }
  
    if(date.getDate() <=9){
      day = day + date.getDate()
    } else {
      day = ''+date.getDate()
    }
    return date.getFullYear()+'-'+month+'-'+day;
}
  
function Schedule({date}) {
    const [games, setGames] = useState(null);
    const [loading, setLoading] = useState(true);
    const prevDate = useRef(new Date());

    useEffect(() =>{
        let active = true;
        if(over4MonthsApart(date, prevDate.current)|| !games){
        getGamesWithinSixMonths(date)
        .then(games => {
            if(active){
            setGames(games);
            setLoading(false);
            prevDate.current=date;
            }})
        .catch(e=>console.log(e));
        } else {
        setLoading(false);
        }
        
        return () => {
            active=false;
        }
        
    },[date,loading,games]);

    if (loading) {
        return (
        <div>page loading...</div>
        )
    }

    return (
        <div>
            <p className='text-center'>
                <span className='bold'>Selected Date:</span> {dateToString(date)}
            </p>
            <GameList games={games[dateToString(date)]}/>
        </div>
    )
}

export default Schedule;