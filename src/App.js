import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/flowdashboard.css';
import $ from 'jquery';

import { FlowApiService } from './service/FlowApiService';
import KanbanList from './components/KanbanList';
import {CFDChart} from './components/CFDChart';


class App extends Component {

    constructor() {
        super();
        this._service = new FlowApiService();
        this.state = { itemsList: [], statusList: [] };        
    }

    componentWillMount() {

        const statuses = this._service.getStatusList();

        $.ajax({
            url: "http://localhost:3001/items",
            dataType: 'json',
            success: function(resp) {
                this.setState( {itemsList: resp, statusList: statuses} );
            }.bind(this)
        });        
    }

    render() {
        return (
        
  <div className="container-fluid">

      <div className="row">

          <div className="chartbox col-xs-12">

            {this.state.itemsList.length > 0 ? (
                <CFDChart items={this.state.itemsList} statuses={this.state.statusList} />
            ) : (
                'Loading data...'
            )}

          </div>

      </div>

      <div className="row">

        {
            this.state.statusList.map(function(status) {
                return (
                    <KanbanList label={status} itemsList={this.state.itemsList.filter((item) => item.STATUS === status)} key={status} />
                );
            }.bind(this))
        }       
        
      </div>
  </div>


    );
  }
}

export default App;
