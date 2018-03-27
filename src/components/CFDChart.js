import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export class CFDChart extends Component {

    render() {

        let chartData = { 
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],            
            datasets: [
              {
                label:'Population 1',
                data:[10, 100, 250, 500, 800, 1000],
                backgroundColor:['rgba(0, 99, 132, 0.7)']                
              },
              {
                label:'Population 2',
                data:[80, 190, 450, 700, 1000, 1689],
                backgroundColor:['rgba(0, 255, 0, 0.7)']
              },
              {
                label:'Population 3',
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