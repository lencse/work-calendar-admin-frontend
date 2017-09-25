import StateTransformer from './StateTransformer'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import EditedIrregularDay from '../Entity/EditedIrregularDay'

export default class UpdateEditingDay implements StateTransformer {

    private param: any

    constructor(param: any) {
        this.param = param
    }

    public delta(state: State): any {
        return { editingDay: assign(state.editingDay, this.param) }
    }

}
