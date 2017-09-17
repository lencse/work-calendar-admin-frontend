import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDay from '../Store/IrregularDay'

export interface LayoutProps {

    dayTypes: DayType[]
    years: Year[]
    irregularDays: IrregularDay[]

}

export default class Layout extends React.Component<LayoutProps, {}> {

    public render() {
        return (
            <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header is-small-screen'>
                <Header />
                {/* <Sidebar years={ this.props.years } /> */}
                <main className='mdl-layout__content'>
                    <Content
                        dayTypes={ this.props.dayTypes }
                        years={ this.props.years }
                        irregularDays={ this.props.irregularDays }
                    />
                </main>
            </div>
        )
    }

}
