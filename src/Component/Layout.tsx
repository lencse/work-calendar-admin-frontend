import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import DayType from '../Store/DayType'
import Year from '../Store/Year'

export interface LayoutProps {

    dayTypes: DayType[]
    years: Year[]

}

export default class Layout extends React.Component<LayoutProps, {}> {

    public render() {
        return (
            <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header is-small-screen'>
                <Header />
                {/* <Sidebar years={ this.props.years } /> */}
                <main className='mdl-layout__content'>
                    <Content
                        dayTypes={ this.props.dayTypes }
                        years={ this.props.years }
                    />
                </main>
            </div>
        )
    }

}
