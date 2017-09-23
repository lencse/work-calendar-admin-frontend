export default class PublicationData {

    public static resourceUri(): string {
        return '/publication/data'
    }

    public id: string
    public isDraft: boolean
    public publicationDate: Date

}
