import React, { Component } from 'react';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/flowdashboard.css';

class App extends Component {
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
  
                          <article className="kanban-entry">
                              <div className="kanban-entry-inner">
                                  <div className="kanban-label">
                                      <h2>Card Label</h2>
                                      <p> 
                                          Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                      </p>
                                      <span className="badge">12 pts</span> <span className="badge">25%</span>
                                  </div>
                              </div>
                          </article>
  
                          <article className="kanban-entry">
                              <div className="kanban-entry-inner">
                                  <div className="kanban-label">
                                      <h2>Card Label</h2>
                                      <p> 
                                          Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                      </p>
                                      <span className="badge">12 pts</span> <span className="badge">25%</span>
                                  </div>
                              </div>
                          </article>
  
                          <article className="kanban-entry">
                              <div className="kanban-entry-inner">
                                  <div className="kanban-label">
                                      <p> 
                                          This card has no label and no metrics !!!
                                      </p>                                    
                                  </div>
                              </div>
                          </article>
  
                      </div>
                  </div>
              </div>

          <div className="panel panel-primary kanban-col col-xs-12 col-md-2">
              <div className="panel-heading"> TO DO </div>
              <div className="panel-body">
                  <div id="TODO" className="kanban-centered">

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <p> 
                                      This card has no label and no metrics !!!
                                  </p>                                    
                              </div>
                          </div>
                      </article>

                  </div>
              </div>
          </div>

          <div className="panel panel-primary kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">DOING</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                  </div>
              </div>                
          </div>

          <div className="panel panel-danger kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">BLOCKED</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                  </div>
              </div>                
          </div>

          <div className="panel panel-success kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">DONE</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                  </div>
              </div>                
          </div>

          <div className="panel panel-warning kanban-col col-xs-12 col-md-2">
              <div className="panel-heading">RELEASED</div>
              <div className="panel-body">
                  <div id="DOING" className="kanban-centered">

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                      <article className="kanban-entry">
                          <div className="kanban-entry-inner">
                              <div className="kanban-label">
                                  <h2>Card Label</h2>
                                  <p> 
                                      Card long description. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put.
                                  </p>
                                  <span className="badge">12 pts</span> <span className="badge">25%</span>
                              </div>
                          </div>
                      </article>

                  </div>
              </div>                
          </div>


      </div>
  </div>


    );
  }
}

export default App;
