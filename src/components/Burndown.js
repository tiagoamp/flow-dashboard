import React from 'react'
import { Line } from 'react-chartjs-2'
import service from '../service/flowservice'
import moment from 'moment'


function getBoundaryDatesFrom(items) {
    const dates = service.getSortedDatesFromItems(items);
    const dueDates = items.map(item => new Date(item.dueDate) || new Date());
    const maxDate = new Date(Math.max.apply(null,dates));
    const minDate = new Date(Math.min.apply(null,dates));
    const maxDueDate = new Date(Math.max.apply(null,dueDates));
    return { maxDate, minDate, maxDueDate }
}

function isWeekendOrHoliday(date, holidays) {
    const w = moment(date).isoWeekday();
    // saturday or sunday
    if (w === 6 || w === 7) return true;
    const isHoliday = holidays.filter(h => h.getTime() === date.getTime()).length > 0;
    if (isHoliday) return true;
    return false;
}

// this functions assumes that min, max and due dates are work days
function getWorkDates(boundDates, holidays) {
    const { minDate, maxDueDate} = boundDates;
    const workdays = [];
    const lastDate = maxDueDate;
    let withinBounds = true, nextDate = minDate;    
    do {
        if (!isWeekendOrHoliday(nextDate, holidays))
            workdays.push(nextDate);
        nextDate = new Date(nextDate);
        nextDate.setDate(nextDate.getDate() + 1);
        withinBounds = nextDate < lastDate;                
    } while (withinBounds);
    workdays.push(maxDueDate);
    return workdays;
}

function getDailyWorkRatio(items, workdays, method) {
    if (method === 'by-items-amount') {
        return items.length / workdays.length;
    } else if (method === 'by-items-size') {
        const totalSize = items.reduce((acc, item) => acc + item.size, 0);
        return totalSize / workdays.length;
    }        
}
/*
function getWorkDatesWithMimimunDaysToAccomplishOneItem(workdays, ratio) {
    const daysToFinishOneItem = Math.ceil(1 / ratio);
    console.log('minimum', daysToFinishOneItem);
    return workdays.reduce((acc, date, index) => {
        if (index % daysToFinishOneItem === 0)
            acc.push(date);
    }, []);
}
*/
function getXlabels(workdays) {
    return workdays.map((d, index) => { 
        const isMultiple = index % 7 === 0;
        return isMultiple ? `${index+1}` : moment(d).format('L');
    });
}

function getDataSets(workAmount, workdays, ratio) {
    const dataPlanned = workdays.map((date, index) => workAmount - (ratio * index));
    const plannedSet = {
        data: dataPlanned,
        label: 'Planned', 
        borderColor: '#000000',
        borderWidth: 2, 
        fill: false
    };

    const dataAccomplished = new Array(workdays.length).fill(5);
    const accomplishedSet = {
        data: dataAccomplished,
        label: 'Accomplished', 
        borderColor: '#0000FF',
        borderWidth: 2, 
        fill: false
    };

    const dataSets = [];
    dataSets.push(plannedSet, accomplishedSet);
    return dataSets;
    /*
    const dataSets = items.map(item => {
        const obj =
            {   
                data: cumulativeMatrix[index],
                label: 'planned', 
                borderColor: '#FF0000', 
            };
        return obj; 
    });
    */    
}


export default function Burndown(props) {
    const { items, holidays } = props;
    const boundDates = getBoundaryDatesFrom(items);
    const workdays = getWorkDates(boundDates, holidays);
    const xLabels = getXlabels(workdays);
    const dailyratio = getDailyWorkRatio(items, workdays, 'by-items-amount');
    const workAmount = items.length; // default = by-items-amount
    const dataSets = getDataSets(workAmount, workdays, dailyratio);

    console.log('bounds', boundDates);
    console.log('workdays', workdays);
    console.log('labels', xLabels);
    console.log('ratio', dailyratio);


    //return (<div>burndown</div>);

    const data = {
        labels: xLabels,
        datasets: dataSets            
    };

    return (
        <div className='burndown-chart'>
            <Line
                data={data}
                width={150}
                height={300}
                options={
                    { 
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:'Burndown Chart',
                            fontSize:16
                        },
                        legend: {
                            display:true,
                            position:'bottom'
                        }, 
                        tooltips: {
                            enabled: true
                        }, 
                        plugins: {
                            filler: {
                                propagate: true
                            }
                        }
                    }
                }
            />
        </div>
    )
    
}
