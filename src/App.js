import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CFD from './components/CFD';
import Burndown from './components/Burndown';
import Kanban from './components/Kanban';
import service from './service/flowservice';

class App extends Component {

  constructor() {
    super();
    this.state = { projName: '', statusList: [], items: [], holidays: [] };        
  }

  componentDidMount() {
    const info = service.getProjectInfo();
    this.setState( {projName: info.project, holidays: info.holidays,   
      statusList: info.statusList, items: info.items } );
  }

  render() {
    return (
      <div className="App">
        <Header project={this.state.projName} />
        <main className="container">
          <CFD statusList={[...this.state.statusList]} items={[...this.state.items]} />
          {
            //<Burndown items={[...this.state.items]} holidays={[...this.state.holidays]} />
          
            //TO DO: <div>semáforo com cor e lead time (media) etc...</div>
          }
          <Kanban statusList={[...this.state.statusList]} items={[...this.state.items]} />
        </main>
        <Footer />
      </div>
    );
  }
  
}

export default App;
