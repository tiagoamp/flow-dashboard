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
    if (w === 6 || w === 7) return true;  // saturday or sunday
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

function getDataSets(workAmount, workdays, ratio, items, lastStatus) {
    const dataPlanned = workdays.map((date, index) => workAmount - (ratio * index));
    const plannedSet = {
        data: dataPlanned,
        label: 'Planned', 
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1, 
        fill: false
    };

    const historyItems = items.map(item => item.statusHistory) // flatmap by hand
        .reduce((acc, arr) => acc = acc.concat(arr), []);

    const dataAccomplished = workdays.reduce((acc,date,index) => {
        const nrOfItemsCompleted = historyItems.filter(h => h.status === lastStatus.name) 
            .filter(h => { 
                //return new Date(h.date).getTime() <= date.getTime();
                return moment(new Date(h.date)).startOf('day').format('L') === moment(date).startOf('day').format('L');
                }).length;
        let val;
        if (index === 0 && nrOfItemsCompleted === 0) 
            val = items.length;            
        else 
            val = nrOfItemsCompleted > 0 ? (acc[index-1] - nrOfItemsCompleted) : acc[index-1];

        return acc.concat(val);
    }, []);
    
    const accomplishedSet = {
        data: dataAccomplished,
        label: 'Accomplished', 
        borderColor: 'rgba(102, 153, 204, 0.7)',
        borderWidth: 1, 
        fill: false
    };

    const dataSets = [];
    dataSets.push(plannedSet, accomplishedSet);
    return dataSets;
}


export default function Burndown(props) {
    const { items, statusList, holidays } = props;
    if (items.length + statusList.length + holidays.length === 0)
        return (<div>Loading</div>);

    const boundDates = getBoundaryDatesFrom(items);
    const workdays = getWorkDates(boundDates, holidays);
    const xLabels = workdays.map((d, index) => moment(d).format('l'));
    const dailyratio = getDailyWorkRatio(items, workdays, 'by-items-amount');
    const workAmount = items.length; // default = by-items-amount
    const dataSets = getDataSets(workAmount, workdays, dailyratio, items, statusList[statusList.length-1]);

    const data = {
        labels: xLabels,
        datasets: dataSets            
    };

    return (
        <div className='burndown-chart-container'>
            <Line
                data={data}
                width={140}
                height={240}
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
