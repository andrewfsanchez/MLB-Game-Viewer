import Play from './Play.js'
import {useState} from 'react'
import { x } from '@xstyled/styled-components'

const displayPlays = (plays) => {
    const ret = []
    let i=1;
    plays.forEach(play => {
        ret.push(<Play play={play} index={i}></Play>)
        i++
    })

    return ret
}


function Inning({plays, inning}){
    const [active, setActive] = useState(false);

    return (
        <x.div boxSizing="border-box" justifyContent="center" pb={2}>
            <x.div h={35} w="65%" border={1} p={2} ml="auto" mr="auto" display="flex" justifyContent="space-between" bg="blue-gray-500-a25" onClick={()=>setActive(!active)} cursor="pointer">
                <div>{inning.number} {inning.isTopInning ? "top" : "bottom"}</div>
                <x.div fontWeight="bold">{active? '-' : '+'}</x.div>
            </x.div>
            {active && displayPlays(plays)}
        </x.div>
    )
}

export default Inning;