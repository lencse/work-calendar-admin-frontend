import { Deserializer } from 'ts-jsonapi/lib'
import Bridge from './Bridge'
import http from './Http'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import DayType from '../Entity/DayType'
import { assign } from 'lodash'
import { deserializer } from './JsonApi'

export default class LoadDayTypes implements Bridge {

    public send(): Promise<any> {
        return http.get(DayType.resourceUri())
    }

    public delta(state: State, answer: any): any {
        return { dayTypes: deserializer.deserialize(answer).map((raw) => assign(new DayType(), raw, {})) }
    }

}
