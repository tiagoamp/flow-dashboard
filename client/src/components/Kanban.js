import React from 'react';
import './Kanban.css';

export default function Kanban(props) {
    const { statusList, items } = props;
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
                    return (
                        <div className='kanban-item-card' key={item.id}>
                            { item.label ? (<span>{`[ ${item.label} ]`}</span>) : null }
                            <span>{item.description}</span>
                            { item.size ? (<span className='badge'>{`${item.size}`}</span>) : null }
                        </div>
                    );
                })    
            }
        </div>
    )
}