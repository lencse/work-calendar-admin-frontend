import { assign } from 'lodash'
import State from './State'
import Bridge from '../Loader/Bridge'
import StateTransformer from '../Loader/StateTransformer'
import LoadDays from '../Loader/LoadDays'
import LoadDayTypes from '../Loader/LoadDayTypes'
import LoadPublicationData from '../Loader/LoadPublicationData'
import LoadUser from '../Loader/LoadUser'
import Loading from '../Loader/Loading'
import EndLoading from '../Loader/EndLoading'
import config from '../Config/config'

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
        this.load(new Loading())
        Promise.all(
            [
                new LoadDays(),
                new LoadDayTypes(),
                new LoadPublicationData(),
                new LoadUser()
            ].map(
                (bridge) => this.parallel(bridge))
            ).then((results) => {
                const apply = {}
                results.forEach((result) => {
                    assign(apply, result)
                })
                this.applyState(assign(this.state, apply))
                this.load(new EndLoading())
            }
        )
    }

    public load(transformer: StateTransformer) {
        this.applyState(assign(this.state, transformer.delta(this.state)))
    }

    public apply(bridge: Bridge) {
        this.load(new Loading())
        bridge.send().then((answer) => {
            this.applyState(assign(this.state, bridge.delta(this.state, answer)))
            if (bridge.next()) {
                this.apply(bridge.next())
            } else {
                this.load(new EndLoading())
            }
        })
    }

    public logout() {
        window.location.href = `${config.apiUrl}/auth/logout`
    }

    private applyState(newState: State) {
        this.state = newState
        this.notifyAll()
    }

    private notifyAll() {
        this.subscribers.forEach((subscriber) => {
            this.notify(subscriber)
        })
    }

    private notify(subscriber: StoreSubscriber) {
        subscriber.update(this.state)
    }

    private parallel(bridge: Bridge): Promise<any> {
        return bridge.send().then((answer) => {
            return bridge.delta(null, answer)
        })
    }

}

const store: Store = new Store()

export default store
