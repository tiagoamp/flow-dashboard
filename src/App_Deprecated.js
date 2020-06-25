import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CFD from './components/CFD';
import Burndown from './components/Burndown';
import Kanban from './components/Kanban';
import ProjectProgress from './components/ProjectProgress';
import ItensProgress from './components/ItensProgress';
import ActionsPanel from './components/ActionsPanel';
import service from './service/flowservice';


class App extends Component {

  constructor() {
    super();
    this.state = { projName: '', milestones: {}, statusList: [], items: [], holidays: [], 
                    actions: [], risks: [], categories: [] };        
  }

  componentDidMount() {
    fetch(`data.json`)
      .then((r) => r.json())
      .then((data) =>{
          const info = service.getProjectInfo(data);
          this.setState( {projName: info.project, holidays: info.holidays,   
              statusList: info.statusList, milestones: info.milestones, items: info.items, 
              actions: info.actions, risks: info.risks } );
              });
  }

  render() {
    //const categories = service.getCategoryList();
    const itemsFeatures = this.state.items.filter(item => !item.category || item.category === 'BACKLOG_ITEM');
    return (
      <div className="App">
        <Header project={this.state.projName} />
        <main className="container">
          <div className="row00">
            <div className="col-container">
              <ItensProgress statusList={[...this.state.statusList]} items={[...itemsFeatures]} />
            </div>
            <div className="col-container">
              <ProjectProgress milestones={this.state.milestones} statusList={[...this.state.statusList]} items={[...itemsFeatures]} actions={this.state.actions}/>
              <CFD statusList={[...this.state.statusList]} items={[...itemsFeatures]} />
              <Burndown statusList={[...this.state.statusList]} items={[...itemsFeatures]} holidays={[...this.state.holidays]} />
            </div>
          </div>
          <div className="row01">
            <Kanban statusList={[...this.state.statusList]} items={[...this.state.items]} />
          </div>
          <div className="row02">
            <ActionsPanel actions={this.state.actions} risks={this.state.risks} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
}

export default App;
