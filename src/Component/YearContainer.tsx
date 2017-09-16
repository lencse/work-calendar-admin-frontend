import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'

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
                            <label className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect checkbox--colored-green' htmlFor={ `checkbox-${year.year}` }>
                                <input
                                    type='checkbox'
                                    id={ `checkbox-${year.year}` }
                                    checked={ year.isEnabled }
                                    className='mdl-checkbox__input'
                                />
                                <span className='mdl-checkbox__label'></span>
                            </label>
                        </h2>
                    </div>
                    <IrregularDays />
                </div>
            </div>
        )
    }

}
