import * as React from 'react'
import DayType from '../Store/DayType'
import Year from '../Store/Year'

export default class IrregularDays extends React.Component<{}, {}> {

    public render() {
        return (
                <table className='mdl-data-table mdl-js-data-table mdl-data-table--selectable projects-table'>
                    <thead>
                        <tr>
                            <th className='mdl-data-table__cell--non-numeric'>Project</th>
                            <th className='mdl-data-table__cell--non-numeric'>Responsible</th>
                            <th className='mdl-data-table__cell--non-numeric'>Client contact</th>
                            <th className='mdl-data-table__cell--non-numeric'>Deadline</th>
                            <th className='mdl-data-table__cell--non-numeric'>Progress</th>
                        </tr>
                        </thead>
                    <tbody>
                    <tr>
                        <td className='mdl-data-table__cell--non-numeric'>Darkboard</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <span className='label label--mini background-color--mint'>Alex</span>
                            <span className='label label--mini background-color--primary'>Dina</span>
                            <span className='label label--mini background-color--cerulean'>Misha</span>
                        </td>
                        <td className='mdl-data-table__cell--non-numeric'>Luke@skywalker.com</td>
                        <td className='mdl-data-table__cell--non-numeric'>Jun 15</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <div id='task1' className='mdl-progress mdl-js-progress'></div>
                            <div className='mdl-tooltip'>
                                44%
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='mdl-data-table__cell--non-numeric'>Big financial app</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <span className='label label--mini background-color--baby-blue'>Vlada</span>
                        </td>
                        <td className='mdl-data-table__cell--non-numeric'>Boss@financial.com</td>
                        <td className='mdl-data-table__cell--non-numeric'>Mar 1</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <div id='task2' className='mdl-progress mdl-js-progress'></div>
                            <div className='mdl-tooltip'>
                                14%
                            </div>
                        </td>
                    </tr>
                    <tr className='is-selected'>
                        <td className='mdl-data-table__cell--non-numeric'>New Year office decoration</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <span className='label label--mini background-color--primary'>Dina</span>
                            <span className='label label--mini background-color--baby-blue'>Vlada</span>
                        </td>
                        <td className='mdl-data-table__cell--non-numeric'>info@creativeit.io</td>
                        <td className='mdl-data-table__cell--non-numeric'>Dec 25</td>
                        <td className='mdl-data-table__cell--non-numeric task-done'>
                            <i id='task3' className='material-icons'>done</i>
                        </td>
                    </tr>
                    <tr>
                        <td className='mdl-data-table__cell--non-numeric'>Don't worry, be happy!!!</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <span className='label label--mini background-color--secondary'>Everybody</span>
                        </td>
                        <td className='mdl-data-table__cell--non-numeric'>Contact@happyness.com</td>
                        <td className='mdl-data-table__cell--non-numeric'>Yesterday</td>
                        <td className='mdl-data-table__cell--non-numeric'>
                            <div id='task4' className='mdl-progress mdl-js-progress'></div>
                            <div className='mdl-tooltip'>
                                31%
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
        )
    }

}
