import React from 'react';
import './Kanban.css';

export default function Kanban(props) {
    const { statusList, items } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);
    return (
        <div className='kanban-container'>
            { 
                statusList.map( status => {
                    const filteredItems = items.filter(item => item.status === status.name);
                    return (
                        <List status={status} items={filteredItems} key={status.name}/>
                    );
                }) 
            }
        </div>
    )
}

function List(props) {
    const bgColor = props.status.color || '#D3D3D3';
    return (
        <div className='kanban-list'>
            <div className='kanban-status-card' style={{ backgroundColor: bgColor }}>
                { props.status.name }
            </div>
            { 
                props.items.map( item => {
                    const isBlocked = item.blocked === "true";
                    return (
                        <div className='kanban-item-card' key={item.id}>
                            { item.label ? (<span>{`[ ${item.label} ]`}</span>) : null }
                            { isBlocked ? (<span style={{color: "rgba(204, 102, 102, 0.7)"}}>{item.description}</span>) : (<span>{item.description}</span>) }
                            { item.size ? (<div className='badge-wrapper'><span className='badge'>{`${item.size}`}</span></div>) : null }
                            { isBlocked ? (<span style={{color: "rgba(204, 102, 102, 0.7)", fontWeight: "bold"}}>(BLOCKED)</span>) : null }
                        </div>
                    );
                })    
            }
        </div>
    )
}