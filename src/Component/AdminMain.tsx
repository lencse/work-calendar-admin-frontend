import * as React from 'react'
import Header from './Header'

export default class AdminMain extends React.Component<{}, {}> {

    public render() {
        return (
            <div className='mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header is-small-screen'>
                <Header />
                <main className='mdl-layout__content'>
                    <div className='mdl-grid'>
                    </div>
                </main>
            </div>
        )
    }

}
