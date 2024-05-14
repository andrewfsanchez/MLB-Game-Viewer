import { x } from '@xstyled/styled-components'

const displayBoxScore = (boxScore) => {
    const header = [<x.th></x.th>]
    const away=[<x.th>Away Team</x.th>]
    const home=[<x.th>Home Team</x.th>]

    let awayRuns=0;
    let homeRuns=0;
    let awayHits=0;
    let homeHits=0;
    let awayErrors=0;
    let homeErrors=0;

    let inning=1;
    for(const [key, val] of Object.entries(boxScore)) {
        header.push(<x.th>{inning}</x.th>)
        away.push(<x.td>{val.away.runs}</x.td>)
        home.push(<x.td>{val.home.runs}</x.td>)

        inning= inning+1

        awayRuns= awayRuns+val.away.runs
        homeRuns= val.home.runs ? homeRuns+val.home.runs : homeRuns
        awayHits= awayHits+val.away.hits
        homeHits= homeHits+val.home.hits
        awayErrors= awayErrors+val.away.errors
        homeErrors= homeErrors+val.home.errors

    }

    header.push([<x.th>R</x.th>, <x.th>H</x.th>, <x.th>E</x.th>])
    away.push([<x.td>{awayRuns}</x.td>, <x.td>{awayHits}</x.td>, <x.td>{awayErrors}</x.td>])
    home.push([<x.td>{homeRuns}</x.td>, <x.td>{homeHits}</x.td>, <x.td>{homeErrors}</x.td>])

    return (
        <x.table>
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

function BoxScore({boxScore}) {
    return (
        <div>
            {displayBoxScore(boxScore)}
        </div>
    )
}

export default BoxScore;
