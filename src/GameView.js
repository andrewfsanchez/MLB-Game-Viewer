import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { x } from '@xstyled/styled-components'

import Inning from './Inning'
import BoxScore from './BoxScore'


const gameURL = (gamepk) => "https://statsapi.mlb.com/api/v1.1/game/"+gamepk+"/feed/live";

const displayGame = (game) => {

    const playsByInning= []
    let plays=[]
    let inning = {number: 1, isTopInning: true}

    

    for(const [key, val] of Object.entries(game.plays)) {
        if(val.inning.number !== inning.number || val.inning.isTopInning !== inning.isTopInning) {
            playsByInning.push(<Inning plays={plays} inning={inning}></Inning>);
            plays=[];
            inning = val.inning;
        }
        plays.push(val)
        
    }
    playsByInning.push(<Inning plays={plays} inning={inning}></Inning>);

    return playsByInning
}

function GameView(){
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    let {gamepk} = useParams();
    let navigate = useNavigate();


    const getGameData = async (url) => {
        const response = await fetch(url);
        const json = await response.json();
    
        const game = {plays:{}, boxScore:{}, away:json.gameData.teams.away.name, home:json.gameData.teams.home.name};
        
        game.boxScore = json.liveData.linescore.innings
        
        for (const [key, val] of Object.entries(json.liveData.plays.allPlays)) {
            if(val.result.type !== "atBat"){
            }
    
            // TODO: fix this to work with running events
            const allEvents = []
            for(let i = 0; i<val.playEvents.length; i++){
                if(val.playEvents[i].isPitch){
                    allEvents[i] = 
                    {
                        isPitch: true,
                        isBaseRunningPlay: false,
                        result: val.playEvents[i].details.call.code,
                        speed: val.playEvents[i].pitchData.startSpeed,
                        type: val.playEvents[i].details.type ? val.playEvents[i].details.type.code : "unknown",
                        zone: val.playEvents[i].pitchData.zone,
                        coordinates: val.playEvents[i].pitchData.coordinates,
                        strikeZoneTop: val.playEvents[i].pitchData.strikeZoneTop,
                        strikeZoneBottom: val.playEvents[i].pitchData.strikeZoneBottom
                    }
                } else if (val.playEvents[i].isBaseRunningPlay){
                    allEvents[i] = 
                    {
                        isPitch: false,
                        isBaseRunningPlay: true,
                        isOut: val.playEvents[i].details.isOut,
                        isScoringPlay: val.playEvents[i].details.isScoringPlay,
                        runner: val.playEvents[i].player.id,
                        eventType: val.eventType
                    }
                }
            }
    
            game.plays[key]={
                inning: {number: val.about.inning, isTopInning:val.about.isTopInning},
                type: val.result.type,
                result: val.result.event,
                count: val.count,
                events: allEvents,
                batter: {name: val.matchup.batter.fullName, id: val.matchup.batter.id},
                pitcher: {name: val.matchup.pitcher.fullName, id: val.matchup.pitcher.id}
            }
        }
    
    
        setGame(game);
        setLoading(false);
    
    }

    useEffect(() => {
        const url = gameURL(gamepk);
        getGameData(url)
        const fetchInterval = setInterval(()=>getGameData(url),20000)
        return () => clearInterval(fetchInterval)
    },[])

    const backToCalendar = () => {
        navigate('/schedule');
    }

    if (loading) {
        return (
        <div>page loading...</div>
        )
    }

    return (
        <x.div>
            <x.button display="flex" position="sticky" top={0} ml="auto" mr="auto" onClick={()=>backToCalendar()} >Back to Schedule</x.button>
            <BoxScore boxScore={game.boxScore} away={game.away} home={game.home}></BoxScore>
            {displayGame(game)}
        </x.div>
    )
}

export default GameView;