import * as React from 'react'
import DayType from '../Store/DayType'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import { Checkbox, Card, CardTitle, CardText, CardMenu } from 'react-mdl'
import IrregularDay from '../Store/IrregularDay'

export interface YearContainerProps {

    year: number
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
                <CardTitle>
                    { year }
                </CardTitle>
                <CardText>
                    <IrregularDays irregularDays={ this.getIrregularDays() } />
                </CardText>
            </Card>
        )
    }

    private getIrregularDays() {
        return this.props.irregularDays.filter(
            (day: any) => this.props.year === day.date.getFullYear()
        )
    }

}
