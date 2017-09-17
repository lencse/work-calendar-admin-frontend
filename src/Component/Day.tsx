import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDay from '../Store/IrregularDay'

export interface DayProps {

    day: IrregularDay

}

export default class Day extends React.Component<DayProps, {}> {

    private months = [
        'január',
        'február',
        'március',
        'április',
        'május',
        'június',
        'július',
        'augusztus',
        'szeptember',
        'október',
        'november',
        'december'
    ]

    public render() {
        const day = this.props.day
        const color = {
            'non-working-day': 'green',
            'relocated-rest-day': 'orange',
            'relocated-working-day': 'purple',
        }[day.typeKey]

        return (
            <tr>
                <td className='mdl-data-table__cell--non-numeric'>
                    <span className='mdl-chip mdl-chip--contact chip-day-type'>
                        <span className={ `mdl-chip__contact mdl-color--${color}` }></span>
                        <span className='mdl-chip__text'>{ this.props.day.dayType.name }</span>
                    </span>
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    {this.months[day.date.getMonth()]} { day.date.getDate() }.
                </td>
                <td className='mdl-data-table__cell--non-numeric'>
                    { this.props.day.description }
                </td>
            </tr>
        )
    }

}
