import StateTransformer from './StateTransformer'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import EditedIrregularDay from '../Entity/EditedIrregularDay'

export default class EditDay implements StateTransformer {

    private day: Day

    constructor(day: Day) {
        this.day = day
    }

    public delta(state: State): any {
        return { editingDay: EditedIrregularDay.fromIrregularDay(this.day) }
    }

}
