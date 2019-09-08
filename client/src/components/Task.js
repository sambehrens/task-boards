import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

export class Task extends Component {
    render() {
        if (_.isEmpty(this.props.task)) {
            return <div className="task">Loading</div>;
        }
        return (
            <Draggable draggableId={this.props.task._id} index={this.props.index}>
                {provided => (
                    <div
                        className="task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <h3>{this.props.task.name}</h3>
                        <p>{this.props.task.description}</p>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Task;
