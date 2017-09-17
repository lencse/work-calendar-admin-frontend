import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import YearContainer from './YearContainer'
import IrregularDays from './IrregularDays'
import AddYear from './AddYear'

export interface ContentProps {

    dayTypes: DayType[]
    years: Year[]

}

export default class Content extends React.Component<ContentProps, {}> {

    public render() {
        return (
            <div id='content-container'>
                <div className='mdl-grid'>
                    { this.years() }
                </div>
                <AddYear />
            </div>
        )
    }

    private years(): JSX.Element[] {
        return this.props.years.sort((year1, year2) => year2.year - year1.year).map(
            (year: Year) => <YearContainer key={ year.year } year={ year } />
        )
    }

}
