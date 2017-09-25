import Bridge from './Bridge'
import http from './Http'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import { Serializer } from 'ts-jsonapi'
import EditedIrregularDay from '../Entity/EditedIrregularDay';
import { deserializer } from './JsonApi';

const irregularDaySerializer = new Serializer('irregularDay', {
    id: 'id',
    attributes: ['date', 'description', 'typeKey'],
})

export default class SaveDay implements Bridge {

    private day: EditedIrregularDay

    constructor(day: EditedIrregularDay) {
        this.day = day
    }

    public send(): Promise<any> {
        return this.day.id
            ? http.put(`${Day.resourceUri()}${this.day.id}`, irregularDaySerializer.serialize(this.day.toIrregularDay()))
            : http.put(Day.resourceUri(), irregularDaySerializer.serialize(this.day.toIrregularDay()))
    }

    public delta(state: State, answer: any): any {
        const data = deserializer.deserialize(answer)
        const resource = assign(new Day(), data, { date: new Date(data.date) })
        const result = this.day.id ? {
            irregularDays: state.irregularDays.map(
                (original) => original.id === resource.id
                    ? resource
                    : original
            )
        } : {
            irregularDays: state.irregularDays.concat([resource])
        }
        return assign(result, { editingDay: null })
    }

}
