import DayType from './DayType'

export default class IrregularDay {

    public static resourceUri(): string {
        return '/irregular-days/'
    }

    public id: number
    public date: Date
    public typeKey: string
    public dayType: DayType
    public description: string

}
