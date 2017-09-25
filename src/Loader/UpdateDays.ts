import Bridge from './Bridge'
import LoadPublicationData from './LoadPublicationData'
import State from '../Store/State'

export default abstract class UpdateDays implements Bridge {

    public abstract send(): Promise<any>

    public abstract delta(state: State, answer: any)

    public next(): Bridge {
        return new LoadPublicationData()
    }

}
