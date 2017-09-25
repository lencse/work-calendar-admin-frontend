import Bridge from './Bridge'
import http from './Http'
import State from '../Store/State'
import Day from '../Entity/IrregularDay'
import { assign } from 'lodash'
import UpdateDays from './UpdateDays'

export default class DeleteDay extends UpdateDays {

    private day: Day

    constructor(day: Day) {
        super()
        this.day = day
    }

    public send(): Promise<any> {
        return http.delete(`/irregular-days/${this.day.id}`)
    }

    public delta(state: State, answer: any): any {
        return { irregularDays: state.irregularDays.filter((test) => test.id !== this.day.id) }
    }

}
