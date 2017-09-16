import * as React from 'react'
import Year from '../Store/Year'

export interface SidebarProps {

    years: Year[]

}

export default class Sidebar extends React.Component<SidebarProps, {}> {

    public render() {
        return (
            <div className='mdl-layout__drawer'>
                {/* <header>Évek</header> */}
                <nav className='mdl-navigation'>
                    { this.years() }
                    {/* <a className='mdl-navigation__link'>
                        <button className='mdl-button mdl-js-button mdl-button--fab mdl-button--colored'>
                            <i className='material-icons'>add</i>
                        </button>
                    </a> */}
                </nav>
                <div className='mdl-layout-spacer'></div>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored-light-blue'>
                    Új
                </button>
            </div>
        )
    }

    private years(): JSX.Element[]  {
        return this.props.years.map(
            (year) => (
                <a key={ year.year } className='mdl-navigation__link'>
                {/* <a key={ year.year } className='mdl-navigation__link mdl-navigation__link--current'> */}
                    <i className='material-icons' role='presentation'>event_note</i>
                    { year.year }
                    <label className='mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect icon-toggle--colored-red' htmlFor={ `checkbox-${year.year}` }>
                        <input type='checkbox' id={ `checkbox-${year.year}` } checked={ year.isEnabled } className='mdl-icon-toggle__input' readOnly={ true } />
                        <i className='mdl-icon-toggle__label material-icons'>check</i>
                    </label>
                </a>
            )
        )
    }

}
