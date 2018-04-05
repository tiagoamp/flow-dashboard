import React, { Component } from 'react';

export default class ItemDysplay extends Component {

    render() {
        return(
            
            <article className="kanban-entry">
                <div className="kanban-entry-inner">
                    <div className="kanban-label">
                        <h2>{this.props.item.LABEL != null ? this.props.item.LABEL : ''}</h2>
                        <p>{this.props.item.DESCRIPTION}</p>
                        <span className="badge">{this.props.item.POINTS != null ? this.props.item.POINTS : ''}</span> 
                        <span className="badge">{this.props.item.PERCENT != null ? this.props.item.PERCENT : ''}</span>
                    </div>
                </div>
            </article>

        );
    }

}