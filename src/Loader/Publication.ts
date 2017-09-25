import Bridge from './Bridge'
import State from '../Store/State'
import LoadDays from './LoadDays'

export default abstract class Publication implements Bridge {

    public abstract send(): Promise<any>

    public abstract delta(state: State, answer: any)

    public next(): Bridge {
        return new LoadDays()
    }

}
