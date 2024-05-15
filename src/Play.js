import Pitch from './Pitch.js'
import PitchInfo from './PitchInfo.js'
import { x } from '@xstyled/styled-components'
import {useState} from 'react'
import Zone from './img/zone.png'

const displayPlayEvents = (events) => {
    const pitchPlot = []
    const pitchInfo =[]

    let pitchNum=1;
    events.forEach(event => {
        if(event.isPitch){
            pitchPlot.push(<Pitch data={event} pitch={pitchNum}></Pitch>)
            pitchInfo.push(<PitchInfo data={event} pitch={pitchNum}></PitchInfo>)
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
        <x.div ml="auto" mr="auto" position="relative" pt={3}>
            <x.div borderCollapse="collapse" border borderColor="black" style={styles}>
                {pitchPlot}
            </x.div> 
        </x.div>
        <x.table borderCollapse="collapse" border={1} marginTop={3}>
        {pitchInfo}
        </x.table>
        </x.div>
    )
    
}

const getPlayDescription = (play) => {
    const batter = play.batter.name
    const pitcher = play.pitcher.name

    const description = play.result ? ` - ${play.result}` : " to Bat"

    return batter + description
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