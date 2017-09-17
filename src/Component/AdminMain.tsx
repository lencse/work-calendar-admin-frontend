import * as React from 'react'
import Layout from './Layout'
import State from '../Store/State'
import store, { StoreSubscriber } from '../Store/Store'

export default class AdminMain extends React.Component<{}, State> implements StoreSubscriber {

    constructor() {
        super()
        store.subscribe(this)
    }

    public render() {
        return (
            <Layout
                dayTypes={ this.state.dayTypes }
                years={ this.state.years }
                irregularDays={ this.state.irregularDays }
                editingDay={ this.state.editingDay }
            />
        )
    }

    public update(newState: State) {
        this.setState(newState)
    }

    public init(initialState: State) {
        this.state = initialState
    }

    public componentDidMount() {
        store.load()
    }

}
