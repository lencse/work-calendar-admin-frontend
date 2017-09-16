import DayType from './DayType'
import Year from './Year'
import { Deserializer } from 'ts-jsonapi'
import { assign } from 'lodash'
import config from '../Config/config'

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' })

export default class State {

    public static getInitialState(): State {
        return new State()
    }

    public dayTypes: DayType[] = []
    public years: Year[] = []

    public load(): Promise<State> {
        return this.chain(this, [
            DayType.resourceUri(),
            Year.resourceUri()
        ])
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
                return Promise.resolve(assign(this, this.resolveDelta(path, resource)))
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
