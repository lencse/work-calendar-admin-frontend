export default class Year {

    public static resourceUri(): string {
        return '/years/'
    }

    // public getResourceUri(): string {
    //     return `${Year.resourceUri()}/${this.year}`
    // }

    public year: number
    public isEnabled: boolean

}
