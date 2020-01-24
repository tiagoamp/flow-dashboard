import React from 'react'
import { Line } from 'react-chartjs-2'
import service from '../service/flowservice'
import moment from 'moment'


function getXlabels(items) {
    const dates = service.getSortedDatesFromItems(items);
    const labels = dates.map(date => moment(date).format('L'));
    return labels;
}

function getHistoryMatrix(statusList, items) {
    const dates = service.getSortedDatesFromItems(items);
    const matrix = {};
    dates.forEach(date => {
        matrix[date.toISOString()] = new Array(statusList.length).fill([]);
    });

    for (let d=0; d<dates.length; d++) {
        const date = dates[d];
        const prevDate = d > 0 ? dates[d-1] : null;
        const values = (prevDate != null) ? (matrix[prevDate.toISOString()]).slice() : new Array(statusList.length).fill([]);
    
        for (let s=0; s<statusList.length; s++) {
            const itemsOfThisStatusInThisDate = items.filter(item => {
                return item.statusHistory.filter(hist => hist.status === statusList[s].name)
                    .filter(hist => new Date(hist.date).getTime() === date.getTime())
                    .length > 0;
            });
            // push moved items to new status
            values[s] = values[s].concat(itemsOfThisStatusInThisDate);
            // remove items from others status
            for (let r=0; r<statusList.length; r++) {
                if (r === s) continue;
                itemsOfThisStatusInThisDate.forEach(itemToRemove => {
                    const filtered = values[r].filter(it => it.id !== itemToRemove.id);
                    values[r] = filtered;
                });                
            }
        };
        matrix[date.toISOString()] = values;
    }
    return matrix;
}

function getHistoryValuesByStatus(statusList, historyMatrix) {
    const matrix = {};
    const keys = Object.keys(historyMatrix);    
    for (let s=0; s<statusList.length; s++) {
        const values = [];
        keys.forEach(key => {
            const arr = historyMatrix[key];
            values.push(arr[s].length);        
        });

        matrix[statusList[s].name] = values;
    }
    return matrix;
}

function getCumulativeValues(matrixByStatus, statusList) {
    const cumulative = [];    
    let prevValues = new Array(6).fill(0);
    for (let s=statusList.length-1; s>=0; s--) {
        const values = matrixByStatus[statusList[s].name];
        const arr = values.map((v,i) => v + prevValues[i]);
        cumulative.push(arr);
        prevValues = [...arr];
    }
    //cumulative.reverse();
    return cumulative;
}

function getDataSets(statusList, cumulativeMatrix) {
    const dataSets = statusList.reverse().map((status, index) => {  
        const obj =
            {   
                data: cumulativeMatrix[index],
                label: status.name, 
                borderColor: status.color, 
                backgroundColor: status.color, 
                fill: true,
            };
        return obj; 
    });

    return dataSets;
}


export default function CFD(props) {
    const { statusList, items } = props;
    if (items.length + statusList.length === 0)
        return (<div>Loading</div>);
    const historyMatrix = getHistoryMatrix(statusList, items);
    const matrixByStatus = getHistoryValuesByStatus(statusList, historyMatrix);
    const cumulativeMatrix = getCumulativeValues(matrixByStatus, statusList);
    const xLabels = getXlabels(items);
    const dataSets = getDataSets(statusList, cumulativeMatrix);
    
    const data = {
        labels: xLabels,
        datasets: dataSets            
    };

    return (
        <div className='cfd-chart-container'>
            <Line
                data={data}
                width={150}
                height={300}
                options={
                    { 
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:'Cumulative Flow Diagram',
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
