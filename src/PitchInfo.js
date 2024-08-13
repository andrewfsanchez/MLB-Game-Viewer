import { x } from '@xstyled/styled-components'

function PitchInfo({data, pitach}) {
    return (
        <x.tr bg='#213a40'>
            <x.td borderBottom={1}>
                {data.result}
            </x.td>
            <x.td borderBottom={1}>
                {data.speed} MPH
            </x.td>
            <x.td textAlign="center" borderBottom={1}>
                {data.type}
            </x.td>
        </x.tr>
        )
}


export default PitchInfo