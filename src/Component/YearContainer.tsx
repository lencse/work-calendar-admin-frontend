import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import { Checkbox, Card } from 'react-mdl'

export interface YearContainerProps {
    year: Year
}

export default class YearContainer extends React.Component<YearContainerProps, {}> {

    public render() {
        const year = this.props.year

        return (
            <div className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <div className='mdl-card mdl-shadow--2dp line-chart'>
                    <div className='mdl-card__title'>
                        <h2 className='mdl-card__title-text'>
                            { year.year }
                            <Checkbox
                                checked={ year.isEnabled }
                                className='checkbox--colored-light-blue'
                                onChange={ this.toggle.bind(this) }
                                label=''
                            />
                        </h2>
                    </div>
                    <IrregularDays />
                </div>
            </div>
        )
    }

    private toggle(e: any) {
        store.toggleYear(this.props.year)
    }

}
