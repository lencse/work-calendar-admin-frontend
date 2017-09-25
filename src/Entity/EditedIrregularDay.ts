import IrregularDay from './IrregularDay'
import { assign } from 'lodash'

export default class EditedIrregularDay {

    public static fromIrregularDay(day: IrregularDay): EditedIrregularDay {
        const date = day.date
        return assign(new EditedIrregularDay(), {
            id: day.id,
            dateString: [date.getFullYear(), (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1), (date.getDate() < 9 ? '0' : '') + date.getDate()].join('-'),
            typeKey: day.dayType.key,
            description: day.description
        })
    }

    public id: number
    public dateString: string = ''
    public typeKey: string = null
    public description: string = ''

    public toIrregularDay(): IrregularDay {
        return assign(new IrregularDay(), {
            id: this.id,
            date: new Date(this.dateString),
            typeKey: this.typeKey,
            description: this.description
        })
    }

}
