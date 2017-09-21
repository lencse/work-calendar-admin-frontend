import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDay from '../Store/IrregularDay'
import store from '../Store/Store'

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
        const icon = {
            'non-working-day': 'nature_people',
            'relocated-rest-day': 'hotel',
            'relocated-working-day': 'build',
        }[day.typeKey]

        return (
            <tr onClick={ this.onClick.bind(this) }>
                <td className='mdl-data-table__cell--non-numeric'>
                    <span className='mdl-chip mdl-chip--contact chip-day-type'>
                        <i className={ `mdl-chip__contact mdl-color--${color} material-icons` }>{ icon }</i>
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

    private onClick() {
        store.editIrregularDay(this.props.day)
    }

}
