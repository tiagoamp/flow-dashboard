import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import service from './service/flowservice';

class App extends Component {

  constructor() {
    super();
    this.state = { projName: '', statusList: [], items: [] };        
  }

  componentDidMount() {
    const info = service.getProjectInfo();
    this.setState( {projName: info.project,  statusList: info.status, items: info.items } );
  }

  render() {
    return (
      <div className="App">
        <Header project={this.state.projName} />
        <div>
          CFD { this.state.statusList}
        </div>
        <div>
          kanban
        </div>
      </div>
    );
  }
  
}

export default App;
