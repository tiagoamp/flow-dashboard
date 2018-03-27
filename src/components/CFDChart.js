import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export class CFDChart extends Component {

    componentWillMount() {
        const items = this.props.items;

        let initialDate = new Date(8640000000000000);
        let endDate = new Date(-8640000000000000);

        items.forEach(function(item) {
            item.statusHistory.forEach(function(history) {
                if (initialDate > history.moved) {
                    initialDate = history.moved;
                }
                if (endDate < history.moved) {
                    endDate = history.moved;
                }
            });
        });
        console.log(initialDate);
        console.log(endDate);

        const numberOfDaysLag = 7;
        const xLabels = [];
        while (initialDate < endDate) {
            xLabels.push(initialDate.toLocaleDateString());
            initialDate.setDate(initialDate.getDate() + numberOfDaysLag);
            if (initialDate >= endDate) {
                xLabels.push(endDate.toLocaleDateString());
            }
        }


        console.log(xLabels);

    }

    render() {        

        let chartData = { 
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],            
            datasets: [
              {
                label:'Blocked',
                data:[10, 100, 250, 500, 800, 1000],
                backgroundColor:['rgba(0, 99, 132, 0.7)']                
              },
              {
                label:'Done',
                data:[80, 190, 450, 700, 1000, 1689],
                backgroundColor:['rgba(0, 255, 0, 0.7)']
              },
              {
                label:'Released',
                data:[100, 300, 650, 900, 1300, 2000],
                backgroundColor:['rgba(255, 0, 0, 0.7)']
              }
            ]
          };

        return (
            <div className="chart">
                
                <Line 
                    data={chartData} 
                    options={
                        {
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
                            }
                        }
                    } 
                    height={500} 
                    width={650}
                />

            </div>
        )
    }
}