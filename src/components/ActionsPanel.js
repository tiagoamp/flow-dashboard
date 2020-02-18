import React from 'react'
import moment from 'moment'
import 'moment/locale/pt-br';

export default function ActionsPanel(props) {
    const { actions, risks } = props;
    const today = moment(new Date());
    moment.locale('pt-br');
    return (
        <div className="panel-container">
            <div className="panel-title">Priority Issues</div>
            <ul className="panel-item-text">
                {
                    actions.map(a => {
                        
                        const delayed = today.isAfter(moment(a.dueDate));
                        return (                            
                            <li key={a.action}><span className="panel-item-text-strong"> Request: </span>{a.action}  
                                <br/>
                                <span className="panel-item-text-strong"> Request date: </span> 
                                    { moment(a.requestDate).format('L') } - 
                                <span className="panel-item-text-strong"> Required to: </span> 
                                    { moment(a.dueDate).format('L') } - 
                                <span className="panel-item-text-strong"> Accomplishedd ate: </span>
                                    { a.accomplishedDate ? moment(a.accomplishedDate).format('L') : 'em aberto' } - 
                                <span className="panel-item-text-strong"> Accountable: </span> {a.accountable} - 
                                <span className="panel-item-text-strong"> Elapsed time: </span> 
                                    { Math.abs(moment(new Date()).diff(a.requestDate, 'days'))+1 } dias
                                    { 
                                        delayed ? 
                                        (<div style={{color: "rgba(204, 102, 102, 0.7)", fontWeight: "bold"}}> 
                                            (Request not accomplished on time, may get the project delayed!)
                                        </div>) 
                                        : '' 
                                    } 
                            </li>
                        );
                    })                
                }
            </ul>
            <p/>
            <div className="panel-title">Risks</div>
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
