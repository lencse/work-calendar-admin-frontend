import DayType from './DayType'
import Year from './Year'
import ActiveYear from './ActiveYear'
import IrregularDay from './IrregularDay'
import EditedIrregularDay from './EditedIrregularDay'
import { assign } from 'lodash'

export function years(state: State): Year[] {
    const result = []
    state.irregularDays.forEach((day) => {
        const year = day.date.getFullYear()
        if (!result[year]) {
            result[year] = {
                year,
                isEnabled: state.activeYears.filter((activeYear) => activeYear.year === year ).length === 1
            }
        }
    })

    return result
}

export default class State {

    public dayTypes: DayType[] = []
    public activeYears: ActiveYear[] = []
    public irregularDays: IrregularDay[] = []
    public editingDay: EditedIrregularDay = null

    // public updateYear(year: Year) {
    //     return assign(this, {
    //         years: this.activeYears.map((original) => {
    //             return original.year === year.year
    //                 ? year
    //                 : original
    //         })
    //     })
    // }

    public addActiveYear(activeYear: ActiveYear) {
        return assign(this, {
            activeYears: this.activeYears.concat([activeYear])
        })
    }

    public removeActiveYear(activeYear: ActiveYear) {
        return assign(this, {
            activeYears: this.activeYears.filter((year) => activeYear.year !== year.year)
        })
    }

    public addIrregularDay(irregularDay: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.concat([irregularDay])
        })
    }

    public updateIrregularDay(irregularDay: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.map((original) => {
                return original.id === irregularDay.id
                    ? irregularDay
                    : original
            })
        })
    }

}
