import StateTransformer from './StateTransformer'
import State from '../Store/State'

export default class Loading implements StateTransformer {

    public delta(state: State): any {
        return {
            isLoading: true
        }
    }

}
