import * as React from 'react'
import PublicationData from '../Store/PublicationData'
import { Menu, MenuItem, IconButton } from 'react-mdl'
import store from '../Store/Store'

export interface HeaderProps {

    publicationData: PublicationData

}

function dateToStr(date: Date) {
    return [
        [date.getFullYear(), (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1), (date.getDate() < 10 ? '0' : '') + date.getDate()].join('-'),
        [(date.getHours() < 10 ? '0' : '') + date.getHours(), (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(), (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()].join(':'),
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
                <IconButton name='more_vert' id='more' />
                <Menu target='more' align='right'>
                    <MenuItem disabled={ !this.props.publicationData.isDraft } onClick={ this.publish.bind(this) }>Élesítés</MenuItem>
                </Menu>
            </div>
        ) : (
            <div className='mdl-layout__header-row'>
            </div>
        )
    }

    private publish() {
        store.publish()
    }

}
