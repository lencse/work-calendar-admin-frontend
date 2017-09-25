import StateTransformer from './StateTransformer'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import EditedIrregularDay from '../Entity/EditedIrregularDay'

export default class NewDay implements StateTransformer {

    public delta(state: State): any {
        return { editingDay: new EditedIrregularDay() }
    }

}
