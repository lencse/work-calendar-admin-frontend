import { Deserializer } from 'ts-jsonapi/lib'
import Bridge from './Bridge'
import http from './Http'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import DayType from '../Entity/DayType'
import { assign } from 'lodash'
import { deserializer } from './JsonApi'
import PublicationData from '../Entity/PublicationData'

export default class Reset implements Bridge {

    public send(): Promise<any> {
        return http.post(`/publication/reset`)
    }

    public delta(state: State, answer: any): any {
        const data = deserializer.deserialize(answer)
        return {
            publicationData: assign(
                new PublicationData(),
                data,
                { publicationDate: data.publicationDate ? new Date(data.publicationDate) : null }
            )
        }
    }

}
