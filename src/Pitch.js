/*
    pZ=0 = center of zone
    pZ = 0.708 where pitch is on the line (right of catcher)
    image is 153px wide, 198px tall
    top and bottom of strike zone vary by batter,
        use StrikeZoneTop/Bottom and compare to pZ to see if pitch is in zone


    any pitch out of strike zone (horizontally) needs an offset >= 80%
        from center of image

    any pitch outside of strike zone (vertically) needs an offset >80% 

*/

import { bottom, x } from '@xstyled/styled-components'

const getColor = (pitchResult) => {
    switch(pitchResult) {
        case "B": //ball
            return "green"
        case "*B": //ball
            return "green"
        case "C": //called strike
            return "yellow"
        case "F": //foul
            return "yellow"
        case "S": //swing strike
            return "yellow"
        case "X": //in play w/ outs
            return "red"
        default: //any hit
            return "blue"
    }
}

function Pitch({data, pitch}){
    if(!data.coordinates.pZ){
        return(null);
    }

    const calcBottomOffset=50+((data.coordinates.pZ- ((data.strikeZoneTop + data.strikeZoneBottom)/2))*(30/(((data.strikeZoneTop + data.strikeZoneBottom)/2)-data.strikeZoneBottom)));
    const calcLeftOffset=50-(data.coordinates.pX *(30/0.708));

    let bottomOffset = `${calcBottomOffset}%`
    let leftOffset = `${calcLeftOffset}%`

    if(calcBottomOffset>100)
        bottomOffset='100%'
    else if(calcBottomOffset<0)
        bottomOffset='0%'

    if(calcLeftOffset>100)
        leftOffset='100%'
    else if(calcLeftOffset<0)
        leftOffset='0%'

return (
    <x.div bottom={bottomOffset} left={leftOffset} position="absolute" transform translateX={"-50%"} translateY={"50%"}>
        <x.a w="16px" h="16px" borderRadius="50%" display="inline-flex" background={getColor(data.result)} fontSize="12px" textAlign="center" justifyContent="center" opacity={{_:'1', hover:'0.7'}} cursor="pointer">
            {pitch}
        </x.a>
    </x.div>
)


}

export default Pitch