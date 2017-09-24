import DayType from './DayType'
import IrregularDay from './IrregularDay'
import EditedIrregularDay from './EditedIrregularDay'
import { Deserializer, Serializer } from 'ts-jsonapi'
import { assign } from 'lodash'
import config from '../Config/config'
import State from './State'
import PublicationData from './PublicationData'
import Http from '../Http/Http'

export interface StoreSubscriber {

    init(initialState: State)
    update(newState: State)

}

const irregularDaySerializer = new Serializer('irregularDay', {
    id: 'id',
    attributes: ['date', 'description', 'typeKey'],
})

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' })

export class Store {

    private http: Http = new Http()
    private subscribers: StoreSubscriber[] = []
    private state: State = new State()

    public subscribe(subscriber: StoreSubscriber) {
        this.subscribers.push(subscriber)
        subscriber.init(this.state)
    }

    public load() {
        this.chain(this.state, [
            DayType.resourceUri(),
            IrregularDay.resourceUri(),
            PublicationData.resourceUri()
        ]).then((state) => {
            this.state = state
            this.notifyAll()
        })
    }

    public addIrregularDay() {
        this.state = assign(this.state, { editingDay: new EditedIrregularDay() })
        this.notifyAll()
    }

    public editIrregularDay(irregularDay: IrregularDay) {
        this.state = assign(this.state, { editingDay: EditedIrregularDay.fromIrregularDay(irregularDay) })
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
        if (this.state.editingDay.id) {
            this.http.put(
                `/irregular-days/${this.state.editingDay.id}`,
                irregularDaySerializer.serialize(this.state.editingDay.toIrregularDay())
            ).then((answer) => {
                const resource = deserializer.deserialize(answer)
                this.state = this.state.updateIrregularDay(assign(resource, { date: new Date(resource.date) }))
                this.notifyAll()
            })
        } else {
            this.http.post(
                `/irregular-days/`,
                irregularDaySerializer.serialize(this.state.editingDay.toIrregularDay())
            ).then((answer) => {
                const resource = deserializer.deserialize(answer)
                this.state = this.state.addIrregularDay(assign(resource, { date: new Date(resource.date) }))
                this.notifyAll()
            })

        }
        this.state = assign(this.state, { editingDay: null })
        this.notifyAll()
    }

    public deleteIrregularDay(day: IrregularDay) {
        this.http.delete(`/irregular-days/${day.id}`).then((answer) => {
            this.state = this.state.deleteIrregularDay(day)
            this.notifyAll()
        })
    }

    public publish() {
        this.http.post(`/publication/publish`).then((answer) => {
            const resource = deserializer.deserialize(answer)
            this.state = assign(this.state, { publicationData: assign(resource, { publicationDate: resource.publicationDate ? new Date(resource.publicationDate) : null})})
            this.notifyAll()
        })
    }

    public reset() {
        this.http.post(`/publication/reset`).then((answer) => {
            const resource = deserializer.deserialize(answer)
            this.state = assign(this.state, { publicationData: assign(resource, { publicationDate: resource.publicationDate ? new Date(resource.publicationDate) : null})})
            this.notifyAll()
        })
    }

    public markForDelete(day: IrregularDay) {
        this.state.markForDelete(day)
        this.notifyAll()
    }

    public cancelDelete(day: IrregularDay) {
        this.state.cancelDelete(day)
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
        return this.http.get(path).then((answer) => {
            const resource = deserializer.deserialize(answer)
            return Promise.resolve(assign(this.state, this.resolveDelta(path, resource)))
        })
    }

    private resolveDelta(path: string, resource: any): any {
        if (DayType.resourceUri() === path) {
            return { dayTypes: resource }
        }
        if (PublicationData.resourceUri() === path) {
            return { publicationData: assign(resource, { publicationDate: resource.publicationDate ? new Date(resource.publicationDate) : null}) }
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
