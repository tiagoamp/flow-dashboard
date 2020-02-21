import React from 'react'
import './Progress.css'
import ProgressBar from './ProgressBar'

export default function ItensProgress(props) {
    const { statusList, items } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);

    const percentPerStatus = Math.floor(100 / (statusList.length-1));

    const statusMult = {};
    statusList.forEach((status, i) => {
        statusMult[status.name] = i;
    });
    const lastStatus = statusList[statusList.length-1].name;
    const today = new Date();

    return (
        <div className="itens-progress-container">
            <div className="backlog-title">Backlog</div>
            {
                items.map(item => {
                    const perc = item.status === lastStatus ? 100 : (statusMult[item.status] * percentPerStatus);
                    const isDelayed = new Date(item.dueDate).getTime() < today.getTime() && item.status !== lastStatus; 
                    return (
                        <div key={item.id}>
                            <span className="progress-item-name">{item.description} </span>
                            { isDelayed ? 
                                (<span className="progress-item-name" style={{color: "rgba(204, 102, 102, 0.7)"}}>(atrasado)</span>) 
                                : ''} 
                            <ProgressBar percentage={perc} />
                        </div>
                    );
                })
            }
        </div>
    )
}
