import * as React from 'react'
import PublicationData from '../Entity/PublicationData'
import { Menu, MenuItem, IconButton } from 'react-mdl'
import store from '../Store/Store'
import Publish from '../Loader/Publish'
import Reset from '../Loader/Reset'
import User from '../Entity/User'

export interface HeaderProps {

    publicationData: PublicationData
    user: User

}

function dateToStr(date: Date) {
    return [
        [date.getFullYear(), (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1), (date.getDate() < 10 ? '0' : '') + date.getDate()].join('-'),
        [(date.getHours() < 10 ? '0' : '') + date.getHours(), (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(), (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()].join(':')
    ].join(' ')
}

export default class Header extends React.Component<HeaderProps, {}> {

    public render() {
        return (
            <header className='mdl-layout__header'>
                { this.header() }
            </header>
        )
    }

    private header(): JSX.Element {
        return this.props.publicationData ? (
            <div className='mdl-layout__header-row'>
                <div>
                    Utolsó élesítés: { this.props.publicationData.publicationDate ? dateToStr(this.props.publicationData.publicationDate) : 'soha' }
                </div>
                <div className='mdl-layout-spacer'></div>

                <div className='avatar-dropdown' id='user-avatar'>
                    <img className='avatar' src={ this.props.user.avatar } />
                </div>

                <Menu target='user-avatar' align='right'>
                    <li className='mdl-list__item mdl-list__item--two-line'>
                        <span className='mdl-list__item-primary-content'>
                            <span className='mdl-list__item-avatar'>
                                <img className='avatar' src={ this.props.user.avatar } />
                            </span>
                            <span>{ this.props.user.name }</span>
                            <span className='mdl-list__item-sub-title'>{ this.props.user.email }</span>
                        </span>
                    </li>
                    <li className='list__item--border-top' />
                    <MenuItem onClick={ this.logout.bind(this) }>Kijelentkezés</MenuItem>
                </Menu>
                <IconButton name='more_vert' id='more' disabled={ !this.props.publicationData.isDraft }/>
                <Menu target='more' align='right'>
                    <MenuItem onClick={ this.publish.bind(this) }>Élesítés</MenuItem>
                    <MenuItem onClick={ this.reset.bind(this) }>Visszaállítás</MenuItem>
                </Menu>
            </div>
        ) : (
            <div className='mdl-layout__header-row'>
            </div>
        )
    }

    private publish() {
        store.apply(new Publish())
    }

    private reset() {
        store.apply(new Reset())
    }

    private logout() {
        store.logout()
    }

}
