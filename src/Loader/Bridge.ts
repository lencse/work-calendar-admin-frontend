import State from '../Store/State'

export default interface Bridge {

    send(): Promise<any>
    delta(state: State, answer: any): any

}
