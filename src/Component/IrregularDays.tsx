import * as React from 'react'
import DayType from '../Entity/DayType'
import IrregularDay from '../Entity/IrregularDay'
import Day from './Day'

export interface IrregularDaysProps {

    irregularDays: IrregularDay[]

}

export default class IrregularDays extends React.Component<IrregularDaysProps, {}> {

    public render() {
        return (
            <table className='mdl-data-table mdl-js-data-table projects-table'>
                <thead>
                    <tr>
                        <th className='mdl-data-table__cell--non-numeric'></th>
                        <th className='mdl-data-table__cell--non-numeric'>Dátum</th>
                        <th className='mdl-data-table__cell--non-numeric'>Leírás</th>
                        <th className='mdl-data-table__cell--non-numeric'></th>
                    </tr>
                </thead>
                <tbody>
                    { this.irregularDays() }
                </tbody>
            </table>
        )
    }

    private irregularDays(): JSX.Element[] {
        return this.props.irregularDays.sort((day1, day2) => day1.date.getTime() - day2.date.getTime()).map(
            (day, idx) => <Day key={ idx } day={ day } />
        )
    }

}
