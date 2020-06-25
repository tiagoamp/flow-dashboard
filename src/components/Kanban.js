import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faPencilAlt, faBug, faFireAlt, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import './Kanban.css';

export default function Kanban(props) {
    const { statusList, items, categories } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);
    return (
        <div className='kanban-container'>
            { 
                statusList.map( status => {
                    const filteredItems = items.filter(item => item.status === status.name);
                    return (
                        <List status={status} items={filteredItems} key={status.name} categories={categories}/>
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
                    const categoryIconTag = getIconTagFor(item);
                    const categorySpan = item.category ? (<span style={{"margin":"5px"}}>{categoryIconTag}</span>) : null;
                    const classForRowLabelAndCategory = (labelSpan && categorySpan) ? 'inline-container' : 'align-right';
                    const rowLabelAndCategoryDiv = (<div className={classForRowLabelAndCategory}>{labelSpan} {categorySpan}</div>);
                    const blockedSpan = isBlocked ? (<div className='danger-bold'>({t('BLOCKED')})</div>) : null;
                    const sizeDiv = item.size ? (<div className='badge-wrapper'><span className='badge'>{`${item.size}`}</span></div>) : null;
                    const classForBlockedAndSize = (blockedSpan && sizeDiv) ? 'inline-container' : 'align-right';
                    const rowBlockedAndSizeDiv = (<div className={classForBlockedAndSize}>{blockedSpan} {sizeDiv}</div>);
                    const kanbanCardClass = !item.category || item.category === 'BACKLOG_ITEM' ? 'kanban-item-card' : 'kanban-item-card-not-feature';
                    return (
                        <div className={kanbanCardClass} key={item.id}>
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

function getIconTagFor(item) {
    let icon = (<FontAwesomeIcon icon={faQuestion} />);
    if (!item.category) return icon;
    switch(item.category) {
        case 'BACKLOG_ITEM':
            icon = (<FontAwesomeIcon icon={faCubes} />)
            break;
        case 'TASK':
            icon = (<FontAwesomeIcon icon={faPencilAlt} />)
            break;
        case 'BUG':
            icon = (<FontAwesomeIcon icon={faBug} />)
            break;
        case 'ACTION':
            icon = (<FontAwesomeIcon icon={faFireAlt} />)
            break;
        default:
            break;            
    }
    return icon;
}
