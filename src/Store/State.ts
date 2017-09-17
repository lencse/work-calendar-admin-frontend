import DayType from './DayType'
import Year from './Year'
import IrregularDay from './IrregularDay'
import { assign } from 'lodash'

export default class State {

    public dayTypes: DayType[] = []
    public years: Year[] = []
    public irregularDays: IrregularDay[] = []

    public updateYear(year: Year) {
        return assign(this, {
            years: this.years.map((original) => {
                return original.year === year.year
                    ? year
                    : original
            })
        })
    }

    public addYear(year: Year) {
        return assign(this, {
            years: this.years.concat([year])
        })
    }

}
