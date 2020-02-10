import React from 'react'
import './Progress.css'


export default function Progress(props) {
    const { statusList, items } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);

    const percentPerStatus = Math.floor(100 / statusList.length);

    const statusMult = {};
    statusList.forEach((status, i) => {
        statusMult[status.name] = i+1;
    });
    const lastStatus = statusList[statusList.length-1].name;

    return (
        <div className="progress-container">
            {
                items.map(item => {
                    const perc = item.status === lastStatus ? 100 : (statusMult[item.status] * percentPerStatus);
                    return (
                        <div key={item.id}>
                            <span className="progress-item-name">{item.description}</span> 
                            <ProgressBar percentage={perc} />
                        </div>
                    );
                })
            }
        </div>
    )
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
          <Filler percentage={props.percentage} />
        </div>
      )
  }
  
  const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
  }