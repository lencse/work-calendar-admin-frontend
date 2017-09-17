import DayType from './DayType'
import Year from './Year'
import IrregularDay from './IrregularDay'
import { Deserializer, Serializer } from 'ts-jsonapi'
import { assign } from 'lodash'
import config from '../Config/config'
import State from './State'

const yearSerializer = new Serializer('year', {
    id: 'id',
    attributes: ['year', 'isEnabled']
})

const irregularDaySerializer = new Serializer('irregularDay', {
    id: 'id',
    attributes: ['date', 'description', 'typeKey'],
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
            Year.resourceUri(),
            IrregularDay.resourceUri()
        ]).then((state) => {
            this.state = state
            this.notifyAll()
        })
    }

    public saveYear(year: Year) {
        fetch(
            `${config.apiUrl}/years/${year.year}`,
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

    public addYear(year: Year) {
        fetch(
            `${config.apiUrl}/years/`,
            {
                method: 'POST',
                body: JSON.stringify(yearSerializer.serialize(year))
            }
            // { credentials: 'include' }
        ).then((resp) => {
            return resp.json().then((data) => {
                const resource = deserializer.deserialize(data)
                this.state = this.state.addYear(deserializer.deserialize(data))
                this.notifyAll()
            })
        })
    }

    public addIrregularDay() {
        this.state = assign(this.state, { editingDay: new IrregularDay() })
        this.notifyAll()
    }

    public cancelIrregularDay() {
        this.state = assign(this.state, { editingDay: null })
        this.notifyAll()
    }

    public updateIrregularDayWith(param: any) {
        this.state = assign(this.state, { editingDay: assign(this.state.editingDay, param) })
        this.notifyAll()
    }

    public saveIrregularDay() {
        fetch(
            `${config.apiUrl}/irregular-days/`,
            {
                method: 'POST',
                body: JSON.stringify(irregularDaySerializer.serialize(assign(this.state.editingDay, { typeKey: this.state.editingDay.dayType.key }))
            }
            // { credentials: 'include' }
        ).then((resp) => {
            return resp.json().then((data) => {
                // console.log(data)
                const resource = deserializer.deserialize(data)
                this.state = this.state.addIrregularDay(assign(resource, { date: new Date(resource.date) }))
                this.notifyAll()
            })
        })
        this.state = assign(this.state, { editingDay: null })
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
            return { years: resource }
        }
        if (IrregularDay.resourceUri() === path) {
            return {
                irregularDays: resource.map(
                    (day: IrregularDay) => assign(day, { date: new Date(day.date) })
                )
            }
        }
    }

}

const store: Store = new Store()

export default store
