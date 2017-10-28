import DayType from '../Entity/DayType'
import IrregularDay from '../Entity/IrregularDay'
import EditedIrregularDay from '../Entity/EditedIrregularDay'
import PublicationData from '../Entity/PublicationData'
import User from '../Entity/User'
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
    public isLoading: boolean = false
    public user: User = null

}
