import React, { Component } from 'react';
import _ from 'lodash';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

export class Column extends Component {
    render() {
        if (
            _.isEmpty(this.props.column) ||
            (!_.isEmpty(this.props.tasks) && _.isUndefined(_.first(this.props.tasks)))
        ) {
            return <div className="column">Loading</div>;
        }

        return (
            <div className="column">
                <h2>{this.props.column.name}</h2>
                <Droppable droppableId={this.props.column._id}>
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {_.map(this.props.tasks, (task, index) => {
                                return <Task key={task._id} task={task} index={index} />;
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default Column;
