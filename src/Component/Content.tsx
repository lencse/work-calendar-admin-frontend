import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import YearContainer from './YearContainer'
import IrregularDays from './IrregularDays'
import AddIrregularDay from './AddIrregularDay'
import IrregularDay from '../Store/IrregularDay'
import EditedIrregularDay from '../Store/EditedIrregularDay'

export interface ContentProps {

    dayTypes: DayType[]
    years: Year[]
    irregularDays: IrregularDay[]
    editingDay: EditedIrregularDay

}

export default class Content extends React.Component<ContentProps, {}> {

    public render() {
        return (
            <div id='content-container'>
                <div className='mdl-grid'>
                    { this.years() }
                </div>
                <AddIrregularDay
                    editingDay={ this.props.editingDay }
                    dayTypes={ this.props.dayTypes }
                />
            </div>
        )
    }

    private years(): JSX.Element[] {
        return this.props.years.sort((year1, year2) => year2.year - year1.year).map(
            (year: Year) => <YearContainer key={ year.year } year={ year } irregularDays={ this.props.irregularDays }/>
        )
    }

}
