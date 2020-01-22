import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CFD from './components/CFD';
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
          <CFD statusList={this.state.statusList} items={this.state.items} />
          <div>burndown</div>
          <div>semáforo com cor e lead time (media) etc...</div>
          <Kanban statusList={this.state.statusList} items={this.state.items} />
        </main>
        <Footer />
      </div>
    );
  }
  
}

export default App;
