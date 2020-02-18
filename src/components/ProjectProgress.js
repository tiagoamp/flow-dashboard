import React from 'react'
import ProgressBar from './ProgressBar'
import moment from 'moment'

export default function ProjectProgress(props) {
    const { statusList, milestones, items, actions } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);
    
    return (
        <div className="progress-container">
            <div className="progress-title">Project Status</div>
            <StatusLight statusList={statusList} items={items} />
            <ActionsLight actions={actions} />
            <MilestonesProgress milestones={milestones} statusList={statusList} items={items} />
        </div>
    )
}

function StatusLight(props) {
    const { statusList, items } = props;
    const lastStatus = statusList[statusList.length-1].name;
    
    const today = new Date();
    const itemsDelayed = items.filter(item => item.status !== lastStatus && today > new Date(item.dueDate));
    //console.log("items delayed",itemsDelayed);
    const percDelayed = Math.ceil( (100 * itemsDelayed.length) / items.length );

    const colors = ["rgba(102, 204, 153, 0.7)", "rgba(218, 226, 130, 0.7)", "rgba(204, 102, 102, 0.7)"];
    const bgColor = percDelayed <= 10 ? colors[0] : (percDelayed <= 30 ? colors[1] : colors[2]);

    return (
        <div className='light-box'>
            <div className="light-circle" style={{backgroundColor: bgColor}}>!</div>
            <div className="progress-item-name">{percDelayed} % of delayed backlog items</div>
        </div>
    )
}

function ActionsLight(props) {
    const { actions } = props;
    const today = new Date();
    const actionsDelayed = actions.filter(action => today > new Date(action.dueDate));
    //console.log("actions delayed",actionsDelayed);
    const percDelayed = Math.ceil( (100 * actionsDelayed.length) / actions.length );

    const colors = ["rgba(102, 204, 153, 0.7)", "rgba(218, 226, 130, 0.7)", "rgba(204, 102, 102, 0.7)"];
    const bgColor = percDelayed <= 10 ? colors[0] : (percDelayed <= 30 ? colors[1] : colors[2]);

    return (
        <div className='light-box'>
            <div className="light-circle" style={{backgroundColor: bgColor}}>!</div>
            <div className="progress-item-name">{percDelayed} % delayed issues</div>
        </div>
    )
}

function MilestonesProgress(props) {
    const { milestones, statusList, items } = props;
    const lastStatus = statusList[statusList.length-1].name;
    
    const init = moment(milestones.initDate), end = moment(milestones.dueDate);
    const projDurationInDays = Math.abs(end.diff(init, 'days'))+1;
    const today = moment(new Date());
    const projDurationUntilToday = Math.abs(today.diff(init, 'days'))+1;
    const percOfTotalDuration = Math.ceil((100 * projDurationUntilToday) / projDurationInDays);
    const accomplItems = items.filter(item => item.status === lastStatus);
    //console.log("items accompl",accomplItems);
    const percOfAccomplItems = Math.ceil( (100 * accomplItems.length) / items.length );

    return (
        <div className="milestones-container">
            <div key="1">
                <span className="progress-item-name">Project elapsed time ({percOfTotalDuration}%)</span> 
                <ProgressBar percentage={percOfTotalDuration} />
            </div>
            <div key="2">
                <span className="progress-item-name">% accomplished items ({percOfAccomplItems}%)</span> 
                <ProgressBar percentage={percOfAccomplItems} />
            </div>
        </div>
    )
}