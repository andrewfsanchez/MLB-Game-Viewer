import { x } from '@xstyled/styled-components'

const displayBoxScore = (boxScore, awayTeam, homeTeam) => {
    const header = [<x.th border={2}></x.th>]
    const away=[<x.th border={2}>{awayTeam}</x.th>]
    const home=[<x.th border={2}>{homeTeam}</x.th>]

    let awayRuns=0;
    let homeRuns=0;
    let awayHits=0;
    let homeHits=0;
    let awayErrors=0;
    let homeErrors=0;

    let inning=1;

    for(const [key, val] of Object.entries(boxScore)) {
        header.push(<x.th border={2} textAlign="center">{inning}</x.th>)
        away.push(<x.td border={2} textAlign="center">{val.away.runs}</x.td>)
        home.push(<x.td border={2} textAlign="center">{val.home.runs}</x.td>)

        inning= inning+1

        awayRuns= val.away.runs ? awayRuns+val.away.runs : awayRuns
        homeRuns= val.home.runs ? homeRuns+val.home.runs : homeRuns
        awayHits= awayHits+val.away.hits
        homeHits= homeHits+val.home.hits
        awayErrors= awayErrors+val.away.errors
        homeErrors= homeErrors+val.home.errors

    }

    header.push([<x.th border={2}>R</x.th>, <x.th border={2}>H</x.th>, <x.th border={2}>E</x.th>])
    away.push([<x.td border={2} textAlign="center">{awayRuns}</x.td>, <x.td border={2} textAlign="center">{awayHits}</x.td>, <x.td border={2} textAlign="center">{awayErrors}</x.td>])
    home.push([<x.td border={2} textAlign="center">{homeRuns}</x.td>, <x.td border={2} textAlign="center">{homeHits}</x.td>, <x.td border={2} textAlign="center">{homeErrors}</x.td>])

    return (
        <x.table width="800" border={2} borderCollapse="collapse">
            <x.thead>
                <x.tr>
                    {header}
                </x.tr>
            </x.thead>
            <x.tbody>
                <x.tr>
                    {away}
                </x.tr>
                <x.tr>
                    {home}
                </x.tr>
                
            </x.tbody>
        </x.table>
    )
}

function BoxScore({boxScore, away, home}) {
    return (
        <x.div display="grid" justifyContent="center" ml="auto" mr="auto" pb={2}>
            {displayBoxScore(boxScore, away, home)}
        </x.div>
    )
}

export default BoxScore;
