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
        <x.div display="grid" justifyContent="center" maxWidth={1120} ml="auto" mr="auto" pb={2}>
            <x.div boxSizing="border-box" h={35} w="1000" border={2} p={1} display="flex" justifyContent="space-between" bg="blue-gray-500-a25" onClick={()=>setActive(!active)} cursor="pointer">
                <div>{inning.number} {inning.isTopInning ? "top" : "bottom"}</div>
                <x.div fontWeight="bold">{active? '-' : '+'}</x.div>
            </x.div>
            {active && displayPlays(plays)}
        </x.div>
    )
}

export default Inning;