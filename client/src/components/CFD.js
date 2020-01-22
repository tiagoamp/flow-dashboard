import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'


function getXdates(items) {
    const statusHistoryArr = items.map(item => item.statusHistory);
    const datesStrArrays = statusHistoryArr.map(statusArr => statusArr.map(obj => obj.date));
    const datesStrFlatArr = datesStrArrays.reduce((acc, x) => acc.concat(x), []);
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const distinctDatesStrArr = datesStrFlatArr.filter(onlyUnique);
    const datesArr = distinctDatesStrArr.map(str => new Date(str));
    const sortedDates = datesArr.sort((a,b) => a - b);
    return sortedDates;
}

function getXlabels(items) {
    const dates = getXdates(items);
    const labels = dates.map(date => moment(date).format('L'));
    return labels;
}

function getHistoryMatrix(statusList, items) {
    const dates = getXdates(items);
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
    cumulative.reverse();
    return cumulative;
}

function getDataSets(statusList, cumulativeMatrix) {
    const dataSets = statusList.map((status, index) => {  
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
    const historyMatrix = getHistoryMatrix(statusList, items);
    const matrixByStatus = getHistoryValuesByStatus(statusList, historyMatrix);
    const cumulativeMatrix = getCumulativeValues(matrixByStatus, statusList);
    const xLabels = getXlabels(items);
    const dataSets = getDataSets(statusList, cumulativeMatrix);
    
    //console.log('xlabels', xLabels);
    //console.log('dataSets', dataSets);
    //console.log('matrix', historyMatrix);
    //console.log('by status', matrixByStatus);
    //console.log('cumulative', cumulativeMatrix);
    console.log('dataSets', dataSets);

    const data = { 
        //labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        labels: xLabels,
        /*datasets: [
          { 
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Africa",
            borderColor: "#3e95cd",
            backgroundColor: "#3e95cd", 
            fill: true
          }, { 
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            backgroundColor: "#8e5ea2",
            fill: true
          }
        ]*/
        datasets: dataSets
    };

    return (
        <div className='cfd-chart'>
            <Line
                data={data}
                width={150}
                height={300}
                options={
                    { 
                        maintainAspectRatio: false,
                        title:{
                            display:true,
                            text:'Cumulative Flow Diagram (CFD)',
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
