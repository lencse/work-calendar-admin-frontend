import * as React from 'react'
import Header from './Header'
import Content from './Content'
import DayType from '../Entity/DayType'
import IrregularDay from '../Entity/IrregularDay'
import EditedIrregularDay from '../Entity/EditedIrregularDay'
import PublicationData from '../Entity/PublicationData'

export interface LayoutProps {

    dayTypes: DayType[]
    years: number[]
    irregularDays: IrregularDay[]
    editingDay: EditedIrregularDay
    publicationData: PublicationData

}

export default class Layout extends React.Component<LayoutProps, {}> {

    public render() {
        return (
            <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header is-small-screen'>
                <Header publicationData={ this.props.publicationData} />
                <main className='mdl-layout__content'>
                    <Content
                        dayTypes={ this.props.dayTypes }
                        years={ this.props.years }
                        irregularDays={ this.props.irregularDays }
                        editingDay={ this.props.editingDay }
                    />
                </main>
            </div>
        )
    }

}
