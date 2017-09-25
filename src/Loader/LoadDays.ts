import { Deserializer } from 'ts-jsonapi/lib'
import Bridge from './Bridge'
import http from './Http'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import DayType from '../Entity/DayType'
import { assign } from 'lodash'
import { deserializer } from './JsonApi'

export default class LoadDays implements Bridge {

    public send(): Promise<any> {
        return http.get(Day.resourceUri())
    }

    public delta(state: State, answer: any): any {
        return {
            irregularDays: deserializer.deserialize(answer).map(
                (raw) => assign(
                    new Day(), raw, {
                        date: new Date(raw.date),
                        dayType: assign(new DayType(), raw.dayType)
                    }
                )
            )
        }
    }

}
