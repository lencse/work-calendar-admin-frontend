import * as React from 'react'
import DayType from '../Entity/DayType'
import IrregularDays from './IrregularDays'
import store from '../Store/Store'
import IrregularDay from '../Entity/IrregularDay'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from 'react-mdl'
import { SelectField, Option } from 'react-mdl-selectfield'
import EditedIrregularDay from '../Entity/EditedIrregularDay'
import NewDay from '../Loader/NewDay'
import CancelEdit from '../Loader/CancelEdit'
import UpdateEditingDay from '../Loader/UpdateEditingDay'
import SaveDay from '../Loader/SaveDay'

interface AddIrregularDayProps {

    editingDay: EditedIrregularDay
    dayTypes: DayType[]

}

export default class AddIrregularDay extends React.Component<AddIrregularDayProps, {}> {

    public render() {
        const day = this.props.editingDay

        return (
            <div>
                <li
                    className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'
                    id='button-add-irregular-day'
                    onClick={ this.openDialog.bind(this) }
                >
                    <i className='material-icons'>add</i>
                </li>
                <Dialog
                    open={ this.props.editingDay ? true : false }
                    style={ { zIndex: 1000 }}
                    onCancel={ this.closeDialog.bind(this) }
                    id='dialog-irregular-day'
                >
                    <DialogTitle>Új nap</DialogTitle>
                    { this.dialogContent() }
                    <DialogActions>
                        <li className='mdl-button color-text--teal mdl-js-button mdl-js-ripple-effect' onClick={ this.save.bind(this) }>
                            Mentés
                        </li>
                        <li className='mdl-button mdl-js-button mdl-js-ripple-effect cancel-button' onClick={ this.closeDialog.bind(this) }>
                            Mégsem
                        </li>
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
        store.load(new NewDay())
    }

    private closeDialog() {
        store.load(new CancelEdit())
    }

    private save() {
        store.apply(new SaveDay(this.props.editingDay))
    }

    private onChangeDate(event: React.FormEvent<HTMLInputElement>) {
        store.load(new UpdateEditingDay({ dateString: event.currentTarget.value }))
    }

    private onChangeType(typeKey: string) {
        store.load(new UpdateEditingDay({ typeKey }))
    }

    private onChangeDescription(event: React.FormEvent<HTMLInputElement>) {
        store.load(new UpdateEditingDay({ description: event.currentTarget.value }))
    }

}
