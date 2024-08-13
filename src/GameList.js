import {useNavigate} from 'react-router-dom';
import { x } from '@xstyled/styled-components'


function displayGame(game, onGameSelect){
    return (
        <x.div boxSizing="border-box" justifyContent="center" pb={2}>
            <x.div  h={35} w={{xs:"90%",md:"65%"}} border={1} p={2} ml="auto" mr="auto" display="flex" justifyContent="center"backgroundColor="#213a40"  onClick={() => onGameSelect(game.gamepk)} cursor="pointer">
                <x.div fontSize={{md:""}}>{game.away} {game.awayScore} @ {game.homeScore} {game.home}</x.div>
            </x.div>
        </x.div>
    )
}



function GameList({games}) {

    let navigate = useNavigate();

    const onGameSelect = (gamepk) => {
        navigate('/mlb/game/'+gamepk);
    }

    return (
        <x.div fontSize={{xs:".90rem", md:"1rem"}} fontWeight={{xs:"semibold", md:"semibold"}}>
            {games ? games.map(game => displayGame(game, onGameSelect)) : "No games found for this day"}
        </x.div>
    )
}


export default GameList;