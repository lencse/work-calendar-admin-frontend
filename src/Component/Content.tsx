import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import YearContainer from './YearContainer'
import IrregularDays from './IrregularDays'

export interface ContentProps {

    dayTypes: DayType[]
    years: Year[]

}

export default class Content extends React.Component<ContentProps, {}> {

    public render() {
        return (
            <div className='mdl-grid'>
                { this.years() }
            </div>
        )
    }

    private years(): JSX.Element[] {
        return this.props.years.map(
            (year: Year) => <YearContainer key={ year.year } year={ year } />
        )
    }

}
