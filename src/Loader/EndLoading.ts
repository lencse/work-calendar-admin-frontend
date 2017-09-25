import StateTransformer from './StateTransformer'
import State from '../Store/State'

export default class EndLoading implements StateTransformer {

    public delta(state: State): any {
        return {
            isLoading: false
        }
    }

}
