import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';

export class Task extends Component {
    render() {
        if (_.isEmpty(this.props.task)) {
            return <div className="task">Loading</div>;
        }
        return (
            <Draggable draggableId={this.props.task._id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div
                        className={classnames('task', { isDragging: snapshot.isDragging })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={this.props.onClick}
                        id={this.props.task._id}>
                        <h3>{this.props.task.name}</h3>
                        <ReactMarkdown>{this.props.task.description}</ReactMarkdown>
                        <p>{this.props.task.estimate}</p>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Task;
