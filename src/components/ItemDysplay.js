import React, { Component } from 'react';

export default class ItemDysplay extends Component {

    render() {
        return(
            
            <article className="kanban-entry">
                <div className="kanban-entry-inner">
                    <div className="kanban-label">
                        <h2>{this.props.item.label != null ? this.props.item.label : ''}</h2>
                        <p>{this.props.item.description}</p>
                        <span className="badge">{this.props.item.points != null ? this.props.item.points : ''}</span> 
                        <span className="badge">{this.props.item.percent != null ? this.props.item.percent : ''}</span>
                    </div>
                </div>
            </article>

        );
    }

}