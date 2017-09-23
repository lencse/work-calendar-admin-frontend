import DayType from './DayType'
import IrregularDay from './IrregularDay'
import EditedIrregularDay from './EditedIrregularDay'
import PublicationData from './PublicationData'
import { assign } from 'lodash'

export function years(state: State): number[] {
    const result = []
    state.irregularDays.forEach((day) => {
        const year = day.date.getFullYear()
        if (!result[year]) {
            result[year] = year
        }
    })

    return result
}

export default class State {

    public dayTypes: DayType[] = []
    public irregularDays: IrregularDay[] = []
    public editingDay: EditedIrregularDay = null
    public publicationData: PublicationData

    public addIrregularDay(irregularDay: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.concat([irregularDay])
        })
    }

    public deleteIrregularDay(irregularDay: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.filter((test) => test.id !== irregularDay.id)
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

    public markForDelete(day: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.map((test) => test.id === day.id ? assign(test, { toDelete: true }) : test)
        })
    }

    public cancelDelete(day: IrregularDay) {
        return assign(this, {
            irregularDays: this.irregularDays.map((test) => test.id === day.id ? assign(test, { toDelete: false }) : test)
        })
    }

}
