import React from 'react'
import moment from 'moment'
import 'moment/locale/pt-br';

export default function ActionsPanel(props) {
    const { actions, risks } = props;
    moment.locale('pt-br');
    return (
        <div className="panel-container">
            <div className="panel-title">Pendências Prioritárias</div>
            <ul className="panel-item-text">
                {
                    actions.map(a => {
                        return (
                            <li key={a.action}><span className="panel-item-text-strong"> Solicitação: </span>{a.action} - 
                                <br/>
                                <span className="panel-item-text-strong"> Data da Solicitação: </span> 
                                    { moment(a.requestDate).format('L') } - 
                                <span className="panel-item-text-strong"> Data do atendimento: </span>
                                    { a.accomplishedDate ? moment(a.accomplishedDate).format('L') : 'em aberto' } - 
                                <span className="panel-item-text-strong"> Responsável: </span> {a.accountable} - 
                                <span className="panel-item-text-strong"> Tempo decorrido: </span> 
                                    { Math.abs(moment(new Date()).diff(a.requestDate, 'days'))+1 } dias 
                            </li>
                        );
                    })                
                }
            </ul>
            <p/>
            <div className="panel-title">Riscos</div>
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
