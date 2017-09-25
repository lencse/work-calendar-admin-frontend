import { assign } from 'lodash'
import State from './State'
import Bridge from '../Loader/Bridge'
import StateTransformer from '../Loader/StateTransformer'
import LoadDays from '../Loader/LoadDays'
import LoadDayTypes from '../Loader/LoadDayTypes'
import LoadPublicationData from '../Loader/LoadPublicationData'

export interface StoreSubscriber {

    init(initialState: State)
    update(newState: State)

}

export class Store {

    private subscribers: StoreSubscriber[] = []
    private state: State = new State()

    public subscribe(subscriber: StoreSubscriber) {
        this.subscribers.push(subscriber)
        subscriber.init(this.state)
    }

    public loadAll() {
        this.chain(this.state, [
            new LoadDays(),
            new LoadDayTypes(),
            new LoadPublicationData()
        ]).then((state) => {
            this.state = state
            this.notifyAll()
        })
    }

    public load(transformer: StateTransformer) {
        this.state = assign(this.state, transformer.delta(this.state))
        this.notifyAll()
    }

    public apply(bridge: Bridge) {
        bridge.send().then((answer) => {
            this.state = assign(this.state, bridge.delta(this.state, answer))
            this.notifyAll()
        })
    }

    private notifyAll() {
        this.subscribers.forEach((subscriber) => {
            this.notify(subscriber)
        })
    }

    private notify(subscriber: StoreSubscriber) {
        subscriber.update(this.state)
    }

    private chain(state: State, bridges: Bridge[]): Promise<State> {
        const x = 1
        if (0 === bridges.length) {
            return Promise.resolve(state)
        }
        const bridge = bridges.pop()
        return bridge.send().then((answer) => {
            return this.chain(assign(state, bridge.delta(state, answer)), bridges)
        })
    }

}

const store: Store = new Store()

export default store
