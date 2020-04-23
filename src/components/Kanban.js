import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const bgColor = props.status.color || '#D3D3D3';
    return (
        <div className='kanban-list'>
            <div className='kanban-status-card' style={{ backgroundColor: bgColor }}>
                { props.status.name }
            </div>
            { 
                props.items.map( item => {
                    const isBlocked = item.blocked === "true";
                    const classForDescription = isBlocked ? 'danger' : '';
                    const labelSpan = item.label ? (<span>{`[${item.label}]`}</span>) : null;
                    const categorySpan = item.category ? (<span>{`[${item.category}]`}</span>) : null;
                    const classForRowLabelAndCategory = (labelSpan && categorySpan) ? 'inline-container' : 'align-right';
                    const rowLabelAndCategoryDiv = (<div className={classForRowLabelAndCategory}>{labelSpan} {categorySpan}</div>);
                    const blockedSpan = isBlocked ? (<div className='danger-bold'>({t('BLOCKED')})</div>) : null;
                    const sizeDiv = item.size ? (<div className='badge-wrapper'><span className='badge'>{`${item.size}`}</span></div>) : null;
                    const classForBlockedAndSize = (blockedSpan && sizeDiv) ? 'inline-container' : 'align-right';
                    const rowBlockedAndSizeDiv = (<div className={classForBlockedAndSize}>{blockedSpan} {sizeDiv}</div>);
                    return (
                        <div className='kanban-item-card' key={item.id}>
                            { item.label || item.category ? rowLabelAndCategoryDiv : null }
                            <span className={classForDescription}>{item.description}</span>
                            { isBlocked || item.size ? rowBlockedAndSizeDiv : null }
                        </div>
                    );
                })    
            }
        </div>
    )
}