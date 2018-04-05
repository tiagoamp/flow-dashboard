import React, { Component } from 'react';
import ItemDysplay from './ItemDysplay';

export default class KanbanList extends Component {

    constructor() {
        super();
        this.getClassNameFromLabel.bind(this);
    }

    getClassNameFromLabel() {
        let classname = "panel kanban-col col-xs-12 col-md-2 ";

        switch (this.props.label) {            
            case 'INBOX':
                classname += 'panel-info';
                break;
            case 'BLOCKED':
                classname += 'panel-danger';
                break;
            case 'DONE':
                classname += 'panel-success';
                break;
            case 'RELEASED':
                classname += 'panel-warning';
                break;
            default:
                classname += 'panel-primary';
                break;
        }
        return classname;
    }


    render() {
        return(

            <div className={this.getClassNameFromLabel()}>
                  <div className="panel-heading"> {this.props.label} </div>
                  <div className="panel-body">
                      <div className="kanban-centered">

                        {
                            this.props.itemsList.map(function(item) {
                                return (
                                    <ItemDysplay item={item} key={item.ID} />
                                );
                            })
                        }

                      </div>
                  </div>
              </div>

        );
    }

}