import {useNavigate} from 'react-router-dom';
import { x } from '@xstyled/styled-components'


function displayGame(game, onGameSelect){
    return (
        <x.div display="grid" maxWidth={1120} justifyContent="center" ml="auto" mr="auto" pb={2}>
            <x.div boxSizing="border-box" h={35} w="1000" border={1} p={2} display="flex" justifyContent="center" bg="blue-gray-500-a10" onClick={() => onGameSelect(game.gamepk)} cursor="pointer">
                <div>{game.home} {game.awayScore} @ {game.homeScore} {game.away}</div>
            </x.div>
        </x.div>
    )
}



function GameList({games}) {

    let navigate = useNavigate();

    const onGameSelect = (gamepk) => {
        navigate('MLB/game/'+gamepk);
    }

    return (
        <x.div >
            {games ? games.map(game => displayGame(game, onGameSelect)) : "No games found for this day"}
        </x.div>
    )
}


export default GameList;