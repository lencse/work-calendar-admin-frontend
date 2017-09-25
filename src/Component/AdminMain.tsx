import * as React from 'react'
import Layout from './Layout'
import State, { years } from '../Store/State'
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
                years={ years(this.state) }
                irregularDays={ this.state.irregularDays }
                editingDay={ this.state.editingDay }
                publicationData={ this.state.publicationData }
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
        store.loadAll()
    }

}
