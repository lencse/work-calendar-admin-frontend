export default class User {

    public static resourceUri(): string {
        return '/user/me'
    }

    public id: string
    public name: string
    public email: string
    public avatar: string

}
