import * as React from 'react'
import Header from './Header'
import DayType from '../Store/DayType'

export interface LayoutProps {

    dayTypes: DayType[]

}

export default class Layout extends React.Component<LayoutProps, {}> {

    public render() {
        return (
            <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header is-small-screen'>
                <Header />
                <main className='mdl-layout__content'>
                    <div className='mdl-grid'>
                        <ul>
                            { this.dayTypes() }
                        </ul>
                    </div>
                </main>
            </div>
        )
    }

    private dayTypes(): JSX.Element[]  {
        return this.props.dayTypes.map(
            (dayType) => <li key={ dayType.key }>{ dayType.name }</li>
        )
    }

}
