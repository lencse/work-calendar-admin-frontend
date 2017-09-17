import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import { Checkbox, Card, CardTitle, CardText, CardMenu } from 'react-mdl'
import IrregularDay from '../Store/IrregularDay'

export interface YearContainerProps {

    year: Year
    irregularDays: IrregularDay[]

}

export default class YearContainer extends React.Component<YearContainerProps, {}> {

    public render() {
        const year = this.props.year

        return (
            <Card
                className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'
                shadow={ 4 }
            >
                <CardTitle className={ year.isEnabled ? 'color-text--teal' : '' }>
                    { year.year }
                </CardTitle>
                <CardText>
                    <IrregularDays irregularDays={ this.getIrregularDays() } />
                </CardText>
                <CardMenu>
                    <Checkbox
                        checked={ year.isEnabled }
                        className='checkbox--colored-teal'
                        onChange={ this.toggle.bind(this) }
                        ripple
                        label='Aktív'
                    />
                </CardMenu>
                {/* @TODO: Elesites/visszavonas a card actionsbe */}
            </Card>
        )
    }

    private toggle() {
        const year = this.props.year
        year.isEnabled = !year.isEnabled
        store.saveYear(this.props.year)
    }

    private getIrregularDays() {
        return this.props.irregularDays.filter(
            (day: any) => this.props.year.year === day.date.getFullYear()
        )
    }

}
