import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import { Checkbox, Card, CardTitle, CardText, CardMenu } from 'react-mdl'

export interface YearContainerProps {
    year: Year
}

export default class YearContainer extends React.Component<YearContainerProps, {}> {

    public render() {
        const year = this.props.year

        return (
            <Card
                className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'
                shadow={ 4 }
            >
                <CardTitle className={ year.isEnabled ? 'year-enabled' : '' }>
                    { year.year }
                </CardTitle>
                <CardText>
                    <IrregularDays />
                </CardText>
                <CardMenu>
                    <Checkbox
                        checked={ year.isEnabled }
                        className='checkbox--colored-teal'
                        onChange={ this.toggle.bind(this) }
                        label=''
                    />
                </CardMenu>
            </Card>
        )
    }

    private toggle(e: any) {
        store.toggleYear(this.props.year)
    }

}
