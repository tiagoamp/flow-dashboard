import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/flowdashboard.css';

import { ItemDao } from './dao/ItemDao';
import KanbanList from './components/KanbanList';
import {CFDChart} from './components/CFDChart';


class App extends Component {

    constructor() {
        super();
        this._dao = new ItemDao();
        this.state = { itemsList: [], statusList: [] };        
    }

    componentWillMount() {
        const items = this._dao.getAll();
        const statuses = this._dao.getStatusList();
        this.setState( {itemsList: items, statusList: statuses} );
    }

    render() {
        return (

        
  <div className="container-fluid">

      <div className="row">

          <div className="chartbox col-xs-12 col-md-3">

            <CFDChart />

          </div>

          <div className="chartbox col-xs-12 col-md-3">Chart 02</div>

          <div className="chartbox col-xs-12 col-md-3">Chart 03</div>

          <div className="chartbox col-xs-12 col-md-3">Chart 04</div>

      </div>

      <div className="row">

        {
            this.state.statusList.map(function(status) {
                return (
                    <KanbanList label={status} itemsList={this.state.itemsList.filter((item) => item.status === status)} key={status} />
                );
            }.bind(this))
        }       
        
      </div>
  </div>


    );
  }
}

export default App;
