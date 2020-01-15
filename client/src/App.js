import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Kanban from './components/Kanban';
import service from './service/flowservice';

class App extends Component {

  constructor() {
    super();
    this.state = { projName: '', statusList: [], items: [] };        
  }

  componentDidMount() {
    const info = service.getProjectInfo();
    this.setState( {projName: info.project,  statusList: info.statusList, items: info.items } );
  }

  render() {
    return (
      <div className="App">
        <Header project={this.state.projName} />
        <main className="container">
          <div>CFD</div>
          <div>burndown</div>
          <Kanban statusList={this.state.statusList} items={this.state.items} />
        </main>
        <footer>footer</footer>
      </div>
    );
  }
  
}

export default App;
