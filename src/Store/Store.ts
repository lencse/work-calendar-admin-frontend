import DayType from './DayType'
import Year from './Year'
import { Deserializer, Serializer } from 'ts-jsonapi'
import { assign } from 'lodash'
import config from '../Config/config'
import State from './State'

const yearSerializer = new Serializer('year', {
    id: 'id',
    attributes: ['year', 'isEnabled']
})

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' })

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

    public load() {
        this.chain(this.state, [
            DayType.resourceUri(),
            Year.resourceUri()
        ]).then((state) => {
            this.state = state
            this.notifyAll()
        })
    }

    public toggleYear(year: Year) {
        year.isEnabled = !year.isEnabled
        fetch(
            `${config.apiUrl}/year/${year.year}`,
            {
                method: 'PUT',
                body: JSON.stringify(yearSerializer.serialize(year))
            }
            // { credentials: 'include' }
        ).then((resp) => {
            return resp.json().then((data) => {
                const resource = deserializer.deserialize(data)
                this.state = this.state.updateYear(deserializer.deserialize(data))
                this.notifyAll()
            })
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

    private chain(state: State, resources: string[]): Promise<State> {
        if (0 === resources.length) {
            return Promise.resolve(state)
        }
        return this.loadResource(resources.pop()).then((newState) => {
            return this.chain(newState, resources)
        })
    }

    private loadResource(path: string): Promise<State> {
        return fetch(
            `${config.apiUrl}${path}`,
            {}
            // { credentials: 'include' }
        ).then((resp) => {
            return resp.json().then((data) => {
                const resource = deserializer.deserialize(data)
                return Promise.resolve(assign(this.state, this.resolveDelta(path, resource)))
            })
        })
    }

    private resolveDelta(path: string, resource: any): any {
        if (DayType.resourceUri() === path) {
            return { dayTypes: resource }
        }
        if (Year.resourceUri() === path) {
            return { years: resource.sort((year1: Year, year2: Year) => year1.year - year2.year) }
        }
    }

}

const store: Store = new Store()

export default store
