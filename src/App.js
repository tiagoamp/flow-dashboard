import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/flowdashboard.css';
import { ItemDao } from './dao/ItemDao';


class App extends Component {

    constructor() {
        super();
        this._dao = new ItemDao();
        this.state = { itemsList: [] };
    }

    componentWillMount() {
        const items = this._dao.getAll();
        this.setState( {itemsList: items} );        
    }

    render() {
        return (

        
  <div className="container-fluid">

      <div className="row">

          <div className="chartbox col-xs-12 col-md-3">Chart 01</div>

          <div className="chartbox col-xs-12 col-md-3">Chart 02</div>

          <div className="chartbox col-xs-12 col-md-3">Chart 03</div>

          <div className="chartbox col-xs-12 col-md-3">Chart 04</div>

      </div>

      <div className="row">

              <div className="panel panel-info kanban-col col-xs-12 col-md-2">
                  <div className="panel-heading"> INBOX </div>
                  <div className="panel-body">
                      <div className="kanban-centered">

                        {
                            this.state.itemsList
                                    .filter((item) => item.status === 'INBOX')
                                    .map(function(item) {
                                        return (
                                            <article className="kanban-entry" key={item.id}>
                                                <div className="kanban-entry-inner">
                                                    <div className="kanban-label">
                                                        <h2>{item.label != null ? item.label : ''}</h2>
                                                        <p>{item.description}</p>
                                                        <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                        <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })
                        }
  
                      </div>
                  </div>
              </div>

          <div className="panel panel-primary kanban-col col-xs-12 col-md-2">
              <div className="panel-heading"> TO DO </div>
              <div className="panel-body">
                  <div id="TODO" className="kanban-centered">

                    {
                        this.state.itemsList
                                .filter((item) => item.status === 'TO DO')
                                .map(function(item) {
                                    return (
                                        <article className="kanban-entry" key={item.id}>
                                            <div className="kanban-entry-inner">
                                                <div className="kanban-label">
                                                    <h2>{item.label != null ? item.label : ''}</h2>
                                                    <p>{item.description}</p>
                                                    <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                    <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                    }

                  </div>
              </div>
          </div>

          <div className="panel panel-primary kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">DOING</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                    {
                        this.state.itemsList
                                .filter((item) => item.status === 'DOING')
                                .map(function(item) {
                                    return (
                                        <article className="kanban-entry" key={item.id}>
                                            <div className="kanban-entry-inner">
                                                <div className="kanban-label">
                                                    <h2>{item.label != null ? item.label : ''}</h2>
                                                    <p>{item.description}</p>
                                                    <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                    <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                    }

                  </div>
              </div>                
          </div>

          <div className="panel panel-danger kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">BLOCKED</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                    {
                        this.state.itemsList
                                .filter((item) => item.status === 'BLOCKED')
                                .map(function(item) {
                                    return (
                                        <article className="kanban-entry" key={item.id}>
                                            <div className="kanban-entry-inner">
                                                <div className="kanban-label">
                                                    <h2>{item.label != null ? item.label : ''}</h2>
                                                    <p>{item.description}</p>
                                                    <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                    <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                    }

                  </div>
              </div>                
          </div>

          <div className="panel panel-success kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">DONE</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                    {
                        this.state.itemsList
                                .filter((item) => item.status === 'DONE')
                                .map(function(item) {
                                    return (
                                        <article className="kanban-entry" key={item.id}>
                                            <div className="kanban-entry-inner">
                                                <div className="kanban-label">
                                                    <h2>{item.label != null ? item.label : ''}</h2>
                                                    <p>{item.description}</p>
                                                    <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                    <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                    }

                  </div>
              </div>                
          </div>

          <div className="panel panel-warning kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">RELEASED</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                    {
                        this.state.itemsList
                                .filter((item) => item.status === 'RELEASED')
                                .map(function(item) {
                                    return (
                                        <article className="kanban-entry" key={item.id}>
                                            <div className="kanban-entry-inner">
                                                <div className="kanban-label">
                                                    <h2>{item.label != null ? item.label : ''}</h2>
                                                    <p>{item.description}</p>
                                                    <span className="badge">{item.points != null ? item.points : ''}</span> 
                                                    <span className="badge">{item.percent != null ? item.percent : ''}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                    }

                  </div>
              </div>                
          </div>


      </div>
  </div>


    );
  }
}

export default App;
