import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export class CFDChart extends Component {

    render() {

        let chartData = { 
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],            
            datasets: [
              {
                label:'Population 1',
                data:[617594, 181045, 153060, 106519, 105162, 95072],
                backgroundColor:['rgba(0, 99, 132, 0.7)']                
              },
              {
                label:'Population 2',
                data:[95000, 105000, 153000, 500000, 106000, 617000],
                backgroundColor:['rgba(0, 255, 0, 0.7)']
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
                                text:'Largest Cities In WHATEVER',
                                fontSize:25
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
                    width={700}
                />


            </div>
        )
    }
}