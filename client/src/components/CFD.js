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
    const matrix = {};
    const xdates = getXdates(items);

    const emptyValues = {};
    statusList.forEach(status => {
        emptyValues[status] = [];
    });
    console.log('empty', emptyValues);

    for (let i=0; i<xdates.length; i++) {
        const date = xdates[i];
        const prevDate = i > 0 ? xdates[i-1] : null;
        const obj = prevDate != null ? matrix.prevDate : emptyValues;
        
        statusList.forEach(status => {
            const itemsOfThisStatusInThisDate = items.filter(item => {
                return item.statusHistory.filter(hist => hist.status === status.name)
                    .filter(hist => new Date(hist.date).getTime() === date.getTime())
                    .length > 0;
            });
            // push moved items to new status
            obj[status].concat(itemsOfThisStatusInThisDate);
            // remove items from others status
            statusList.forEach(rmStatus => {
                if (rmStatus.name === status.name) return;
                itemsOfThisStatusInThisDate.forEach(itemToRemove => {
                    const filtered = obj[rmStatus].filter(it => it.id !== itemToRemove.id);
                    obj[rmStatus] = filtered;
                });                
            });
        });

        matrix[date] = obj;
    }
    return matrix;
}

function getDataSets(statusList, items) {
    const dataSets = statusList.map(status => {  
        const obj =
            {
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

    const xLabels = getXlabels(items);
    const dataSets = getDataSets(statusList, items);
    const matrix = getHistoryMatrix(statusList, items);
    console.log(xLabels);
    console.log(dataSets);
    console.log(matrix);

    const data = { 
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [
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


        ]
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
