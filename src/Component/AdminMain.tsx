import * as React from 'react'
import Layout from './Layout'
import State from '../Store/State'

export default class AdminMain extends React.Component<{}, State> {

    constructor() {
        super()
        this.state = State.getInitialState()
    }

    public render() {
        return (
            <Layout
                dayTypes={ this.state.dayTypes }
                years={ this.state.years }
            />
        )
    }

    public componentDidMount() {
        this.state.load().then((newState) => {
            this.setState(newState)
        })
    }

}
