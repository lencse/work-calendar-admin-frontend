import State from '../Store/State'

export default interface StateTransformer {

    delta(state: State): any

}
