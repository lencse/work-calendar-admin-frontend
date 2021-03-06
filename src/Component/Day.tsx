import * as React from 'react'
import DayType from '../Entity/DayType'
import IrregularDay from '../Entity/IrregularDay'
import store from '../Store/Store'
import * as reactClickOutside from 'react-click-outside'
import DeleteDay from '../Loader/DeleteDay'
import EditDay from '../Loader/EditDay'
import CancelDelete from '../Loader/CancelDelete'
import MarkForDelete from '../Loader/MarkForDelete'

export interface DayProps {

    day: IrregularDay

}

class Day extends React.Component<DayProps, {}> {

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
            <tr>
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
                <td>
                    { this.actionComponents() }

                </td>
            </tr>
        )
    }

    public handleClickOutside() {
        store.load(new CancelDelete(this.props.day))
    }

    private actionComponents(): JSX.Element {
        return this.props.day.toDelete
            ? (
                <span>
                    <li className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored-red' onClick={ this.onDelete.bind(this) }>
                        <i className='material-icons'>delete</i>
                        Rendben
                    </li>
                </span>
        ) : (
                <span>
                <li className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect' onClick={ this.onEdit.bind(this) }>
                    <i className='material-icons'>edit</i>
                </li>
                    <li className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect' onClick={ this.onMarkForDelete.bind(this) }>
                        <i className='material-icons'>delete</i>
                    </li>
                </span>
            )
    }

    private onEdit() {
        store.load(new EditDay(this.props.day))
    }

    private onMarkForDelete() {
        store.load(new MarkForDelete(this.props.day))
    }

    private onDelete() {
        store.apply(new DeleteDay(this.props.day))
    }
}

export default reactClickOutside(Day)
