import StateTransformer from './StateTransformer'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import EditedIrregularDay from '../Entity/EditedIrregularDay'

export default class CancelDelete implements StateTransformer {

    private day: Day

    constructor(day: Day) {
        this.day = day
    }

    public delta(state: State): any {
        return {
            irregularDays: state.irregularDays.map(
                (test) => test.id === this.day.id
                    ? assign(test, { toDelete: false })
                    : test
            )
        }
    }

}
