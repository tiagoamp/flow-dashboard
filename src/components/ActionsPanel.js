import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function ActionsPanel(props) {
    const { t } = useTranslation();
    const { actions, risks } = props;
    const today = moment(new Date());
    moment.locale('pt-br');
    return (
        <div className="panel-container">
            <div className="panel-title">{t('priority-issues')}</div>
            <ul className="panel-item-text">
                {
                    actions.map(a => {
                        
                        const delayed = today.isAfter(moment(a.dueDate)) && !a.accomplishedDate;
                        return (                            
                            <li key={a.action}><span className="panel-item-text-strong">{t('request')}: </span>{a.action}  
                                <br/>
                                <span className="panel-item-text-strong"> {t('request-date')}: </span> 
                                    { moment(a.requestDate).format('L') } - 
                                <span className="panel-item-text-strong"> {t('required-to')}: </span> 
                                    { moment(a.dueDate).format('L') } - 
                                <span className="panel-item-text-strong"> {t('accomplished-date')}: </span>
                                    { a.accomplishedDate ? moment(a.accomplishedDate).format('L') : `${t('ongoing')}` } - 
                                <span className="panel-item-text-strong"> {t('accountable')}: </span> {a.accountable} - 
                                <span className="panel-item-text-strong"> {t('elapsed-time')}: </span> 
                                    { a.accomplishedDate ? Math.abs(moment(new Date(a.accomplishedDate)).diff(a.requestDate, 'days'))+1 
                                         : Math.abs(moment(new Date()).diff(a.requestDate, 'days'))+1 } {t('days')}
                                    { 
                                        delayed ? 
                                        (<div style={{color: "rgba(204, 102, 102, 0.7)", fontWeight: "bold"}}> 
                                            ({t('action-delayed-statement')})
                                        </div>) 
                                        : '' 
                                    } 
                            </li>
                        );
                    })                
                }
            </ul>
            <p/>
            <div className="panel-title">{t('risks')}</div>
            <ul className="panel-item-text">
                {
                    risks.map(r => {
                        return (
                            <li key={r}>{r}</li>
                        );
                    })                
                }
            </ul>            
        </div>
    )
}
