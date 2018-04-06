import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export class CFDChart extends Component {

    constructor() {
        super();
        this._xlabels = [];
        this._datasets = [];
    }

    _getLabels(items) {
        const xLabels = [];

        items.forEach(function(item) {
            item.history.forEach((history) => {
                const dt = new Date(history.MOVED);
                if (!xLabels.includes(dt.toLocaleDateString())) {
                    xLabels.push(dt.toLocaleDateString());                    
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
        return xLabels;
    }

    _initStatusArrayWithZeros(arr) {
        for(let i=0; i<arr.length; i++) {
            arr[i] = Array(this._xlabels.length).fill(0);    
        }
        return arr;
    }

    _loadData(items, statuses) {
        let arr = Array(statuses.length);
        arr = this._initStatusArrayWithZeros(arr);
        

        const allHistory = [];
        items.forEach( (item) => { 
            item.history.forEach( (history) => allHistory.push(history) );
        });

        for (let l=0; l<this._xlabels.length; l++) {
            const dateX = this._xlabels[l];

            let labelHistories = allHistory.filter( (history) => {
                return new Date(history.MOVED).toLocaleDateString() === dateX;
            });

            // tentar montar tabela de qtidades por label !!!
            for (let s=0; s < statuses.length; s++) {
                labelHistories.forEach( (history) => {
                    if (history.STATUS === statuses[s]) {

                        // !!! diminuir do status anterior qdo mover !!!

                        arr[s][l] = arr[s][l] + 1; // qto cresceu

                    }
                });
            }

        }


        /*for (let l=0; l<this._xlabels.length; l++) {
            const dateX = this._xlabels[l];
            items.forEach( (item) => {
                item.history.forEach( (history) => {
                    const dtHist = new Date(history.MOVED);
                    if (dtHist.toLocaleDateString() === dateX) {                        
                        for (let s=0; s<statuses.length; s++) {
                            if (history.STATUS === statuses[s]) {
                                const newValue = arr[s][l] + 1;
                                arr[s].fill(newValue, l);
                                //arr[s][l] = newValue;
                            }    
                        }
                    }
                });
            });
        }*/
        return arr;
    }

    _calculateCumulativeValues(arr) {
        for(let s=arr.length-1; s>0; s--) {
            for(let l=0; l<this._xlabels.length; l++) {
                arr[s-1][l] = arr[s-1][l] + arr[s][l];
            }
        }
        return arr;
    }

    _createDatasetsObjs(arr, statuses) {
        const colors = ['rgba(102, 204, 255, 0.7)', 'rgba(102, 153, 204, 0.7)', 'rgba(000, 153, 204, 0.7)', 
                         'rgba(204, 102, 102, 0.7)', 'rgba(102, 204, 153, 0.7)', 'rgba(218, 226, 130, 0.7)'];

        for(let i=arr.length-1; i>=0; i--) {
            this._datasets.push( {
                label:statuses[i],
                data:arr[i],
                backgroundColor:colors[i] 
            } );    
        }        
    }

    componentWillMount() {
        const items = this.props.items;
        const statuses = this.props.statuses;
        
        this._xlabels = this._getLabels(items);
        
        let dataPerStatus = this._loadData(items, statuses);
        
        //dataPerStatus = this._calculateCumulativeValues(dataPerStatus);

        this._createDatasetsObjs(dataPerStatus, statuses); 
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
                    height={60} 
                    width={300}
                />

            </div>
        )
    }
}