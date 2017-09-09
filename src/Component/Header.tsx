import * as React from 'react'

export default class Header extends React.Component<{}, {}> {

    public render() {
        return (
            <header className='mdl-layout__header'>
                <div className='mdl-layout__header-row'>
                    <div>
                        Work Calendar Admin
                    </div>
                    <div className='mdl-layout-spacer'></div>
                </div>
            </header>
        )
    }

}
