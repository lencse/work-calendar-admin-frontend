import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl'

interface AddYearState {

    showDialog: boolean
    year: string

}

export default class AddYear extends React.Component<{}, AddYearState> {

    constructor() {
        super(...arguments)
        this.state = {
            showDialog: false,
            year: ''
        }
    }

    public render() {
        return (
            <div>
                <button
                    className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
                    id='button-add-year'
                    onClick={ this.openDialog.bind(this) }
                >
                    <i className='material-icons'>add</i>
                </button>
                <Dialog open={ this.state.showDialog } style={ { zIndex: 1000 }} onCancel={ this.closeDialog.bind(this) }>
                    <DialogTitle>Új év</DialogTitle>
                    <DialogContent>
                        <div className='mdl-textfield mdl-js-textfield'>
                            <input
                                className='mdl-textfield__input'
                                type='text' pattern='[0-9]{4}'
                                id='input-year'
                                value={ this.state.year }
                                onChange={ this.onChange.bind(this) }
                            />
                            <label className='mdl-textfield__label' htmlFor='input-year'>Év</label>
                            <span className='mdl-textfield__error'>Hibás évszám</span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='mdl-button color-text--teal mdl-js-button mdl-js-ripple-effect' onClick={ this.addYear.bind(this) }>
                            Mentés
                        </button>
                        <button className='mdl-button mdl-js-button mdl-js-ripple-effect cancel-button' onClick={ this.closeDialog.bind(this) }>
                            Mégsem
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    private openDialog() {
        this.setState({ showDialog: true, year: '' })
    }

    private closeDialog() {
        this.setState({ showDialog: false, year: '' })
    }

    private addYear() {
        store.addYear({
            isEnabled: false,
            year: +this.state.year
        })
        this.closeDialog()
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ showDialog: true, year: e.currentTarget.value })
    }

}
