import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CFD from './components/CFD';
import Burndown from './components/Burndown';
import Kanban from './components/Kanban';
import ProjectProgress from './components/ProjectProgress';
import ItensProgress from './components/ItensProgress';
import service from './service/flowservice';


class App extends Component {

  constructor() {
    super();
    this.state = { projName: '', milestones: {}, statusList: [], items: [], holidays: [] };        
  }

  componentDidMount() {
    const info = service.getProjectInfo();
    this.setState( {projName: info.project, holidays: info.holidays,   
      statusList: info.statusList, milestones: info.milestones, items: info.items } );
  }

  render() {
    return (
      <div className="App">
        <Header project={this.state.projName} />
        <main className="container">
          <div className="row00">
            <div className="col-container">
              <ItensProgress statusList={[...this.state.statusList]} items={[...this.state.items]} />
            </div>
            <div className="col-container">
              <ProjectProgress milestones={this.state.milestones} statusList={[...this.state.statusList]} items={[...this.state.items]} />
              <CFD statusList={[...this.state.statusList]} items={[...this.state.items]} />
              <Burndown statusList={[...this.state.statusList]} items={[...this.state.items]} holidays={[...this.state.holidays]} />
            </div>
          </div>
          <div className="row02">
            <Kanban statusList={[...this.state.statusList]} items={[...this.state.items]} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
}

export default App;
