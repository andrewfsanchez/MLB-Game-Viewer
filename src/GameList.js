import {useNavigate} from 'react-router-dom';
import { x } from '@xstyled/styled-components'


function displayGame(game, onGameSelect){
    return (
        <x.div boxSizing="border-box" justifyContent="center" pb={2}>
            <x.div h={35} w="65%" border={1} p={2} ml="auto" mr="auto" display="flex" justifyContent="center" bg="blue-gray-500-a10" onClick={() => onGameSelect(game.gamepk)} cursor="pointer">
                <div>{game.away} {game.awayScore} @ {game.homeScore} {game.home}</div>
            </x.div>
        </x.div>
    )
}



function GameList({games}) {

    let navigate = useNavigate();

    const onGameSelect = (gamepk) => {
        navigate('/MLB/game/'+gamepk);
    }

    return (
        <x.div >
            {games ? games.map(game => displayGame(game, onGameSelect)) : "No games found for this day"}
        </x.div>
    )
}


export default GameList;