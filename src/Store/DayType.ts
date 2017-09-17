export default class DayType {

    public static resourceUri(): string {
        return '/day-types/'
    }

    public id: string
    public isRestDay: boolean
    public key: string
    public name: string

}
