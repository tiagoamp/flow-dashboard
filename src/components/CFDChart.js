import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export class CFDChart extends Component {

    constructor() {
        super();
        this._xlabels = '';
        this._datasets = [];
    }
    
    componentWillMount() {
        const items = this.props.items;
        const statuses = this.props.statuses;

        const xLabels = [];
        
        items.forEach(function(item) {
            item.statusHistory.forEach(function(history) {
                if (!xLabels.includes(history.moved.toLocaleDateString())) {
                    xLabels.push(history.moved.toLocaleDateString());
                }                
            });
        });
        
        let dateSortAsc = function (i1, i2) {
            const date1 = new Date(i1);
            const date2 = new Date(i2);
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        };

        xLabels.sort(dateSortAsc);
        console.log(xLabels);
        this._xlabels = xLabels;
        
        let dataStatus = Array(statuses.length);
        for(let i=0; i<dataStatus.length; i++) {
            dataStatus[i] = Array(xLabels.length).fill(0);    
        }
        
        for (let i=0; i<xLabels.length; i++) {
            const dateX = xLabels[i];
            items.forEach(function(item) {
                item.statusHistory.forEach(function(history) {
                    if (history.moved.toLocaleDateString() === dateX) {
                        
                        for (let j=0; j<statuses.length; j++) {
                            if (history.status === statuses[j]) {
                                dataStatus[j][i] = dataStatus[j][i] + 1;
                            }    
                        }

                    }
                });
            });
        }

        // cumulative
        for(let i=dataStatus.length-1; i>0; i--) {
            for(let j=0; j<xLabels.length; j++) {
                dataStatus[i-1][j] = dataStatus[i-1][j] + dataStatus[i][j];
            }
        }

        console.log(dataStatus);

        this._datasets.push( {
            label:'Released',
            data:dataStatus[5],
            backgroundColor:['rgba(218, 226, 130, 0.7)'] 
        } );

        this._datasets.push( {
            label:'Done',
            data:dataStatus[4],
            backgroundColor:['rgba(102, 204, 153, 0.7)'] 
        } );

        this._datasets.push( {
            label:'Blocked',
            data:dataStatus[3],
            backgroundColor:['rgba(204, 102, 102, 0.7)'] 
        } );

        this._datasets.push( {
            label:'Doing',
            data:dataStatus[2],
            backgroundColor:['rgba(000, 153, 204, 0.7)']             
        } );

        this._datasets.push( {
            label:'To Do',
            data:dataStatus[1],
            backgroundColor:['rgba(102, 153, 204, 0.7)'] 
        } );

        this._datasets.push( {
            label:'Inbox',
            data:dataStatus[0],
            backgroundColor:['rgba(102, 204, 255, 0.7)'] 
        } );

    }

    render() {        
        
        let chartData = { 
            labels: this._xlabels,            
            datasets:               
              this._datasets            
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
                    width={700}
                />

            </div>
        )
    }
}