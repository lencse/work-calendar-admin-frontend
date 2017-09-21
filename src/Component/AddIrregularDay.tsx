import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import IrregularDay from '../Store/IrregularDay'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from 'react-mdl'
import { SelectField, Option } from 'react-mdl-selectfield'
import EditedIrregularDay from '../Store/EditedIrregularDay'

interface AddIrregularDayProps {

    editingDay: EditedIrregularDay
    dayTypes: DayType[]

}

export default class AddIrregularDay extends React.Component<AddIrregularDayProps, {}> {

    public render() {
        const day = this.props.editingDay

        return (
            <div>
                <button
                    className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
                    id='button-add-irregular-day'
                    onClick={ this.openDialog.bind(this) }
                >
                    <i className='material-icons'>add</i>
                </button>
                <Dialog
                    open={ this.props.editingDay ? true : false }
                    style={ { zIndex: 1000 }}
                    onCancel={ this.closeDialog.bind(this) }
                    id='dialog-irregular-day'
                >
                    <DialogTitle>Új nap</DialogTitle>
                    { this.dialogContent() }
                    <DialogActions>
                        <button className='mdl-button color-text--teal mdl-js-button mdl-js-ripple-effect' onClick={ this.save.bind(this) }>
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

    private dialogContent() {
        return this.props.editingDay ? (
            <DialogContent>

                <div className='mdl-textfield mdl-js-textfield'>
                    <input
                        className='mdl-textfield__input'
                        type='date'
                        id='input-year'
                        value={ this.props.editingDay.dateString }
                        onChange={ this.onChangeDate.bind(this) }
                    />
                    <label className='mdl-textfield__label' htmlFor='input-year'></label>
                    <span className='mdl-textfield__error'>Hibás dátum</span>
                </div>

                <SelectField
                    label={'Típus'}
                    value={ this.props.editingDay.typeKey ? this.props.editingDay.typeKey : null }
                    onChange={ this.onChangeType.bind(this) }
                >
                    { this.dayTypes() }
                </SelectField>

                {/* <div className='mdl-textfield mdl-js-textfield'>
                    <textarea className='mdl-textfield__input' id='textfield-day-description' value={ this.props.editingDay.description } />
                    <label className='mdl-textfield__label' htmlFor='textfield-day-description'>Leírás</label>
                </div> */}

                <Textfield
                    onChange={ this.onChangeDescription.bind(this) }
                    value={ this.props.editingDay.description }
                    label='Leírás'
                    rows={3}
                />
            </DialogContent>
        ) : <DialogContent />
    }

    private dayTypes() {
        return this.props.dayTypes.map((dayType) => <Option key={ dayType.key } value={ dayType.key }>{ dayType.name }</Option>)
    }

    private openDialog() {
        store.addIrregularDay()
    }

    private closeDialog() {
        store.cancelIrregularDay()
    }

    private save() {
        store.saveIrregularDay()
    }

    private onChangeDate(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
        store.updateIrregularDayWith({ dateString: event.currentTarget.value })
    }

    private onChangeType(typeKey: string) {
        store.updateIrregularDayWith({ typeKey })
    }

    private onChangeDescription(event: React.FormEvent<HTMLInputElement>) {
        store.updateIrregularDayWith({ description: event.currentTarget.value })
    }

}
