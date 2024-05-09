import Pitch from './Pitch.js'
import { x } from '@xstyled/styled-components'
import {useState} from 'react'
import Zone from './img/zone.png'

const displayPlayEvents = (events) => {
    const ret = []
    let pitchNum=1;
    events.forEach(event => {
        if(event.isPitch){
            ret.push(<Pitch data={event} pitch={pitchNum}></Pitch>)
            pitchNum=pitchNum+1;
        } else if(event.isBaseRunningPlay) {
            
        } else {
            
        }
    })

    let styles = {
        backgroundImage : `url(${Zone})`,
        width: '153px',
        height: '198px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    

    }
    

    return (
        <x.div ml="auto" mr="auto" position="relative">
        <x.div borderCollapse="collapse" border borderColor="black" style={styles} >
            {ret}
        </x.div>
        </x.div>
    )
    
}

const getPlayDescription = (play) => {
    const batter = play.batter.name
    const pitcher = play.pitcher.name

    return batter + ' ' + play.result
}


function Play({play, index}){
    const [active, setActive] = useState(false);

    return (
        <x.div display="grid" justifyContent="center" maxWidth={1120} ml="5" mr="auto" pt={2}>
            <x.div boxSizing="border-box" h="35" w="800" border={1} p={1} display="flex" justifyContent="space-between" bg="blue-gray-500-a10" onClick={()=>setActive(!active)} cursor="pointer">
                <div>Play #{index}: {getPlayDescription(play)}</div>
                <x.div fontWeight="bold">{active? '-' : '+'}</x.div>
            </x.div>
            {active && displayPlayEvents(play.events)}
        </x.div>
    )
}

export default Play;