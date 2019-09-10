import React, { Component } from 'react';
import _ from 'lodash';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';

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
                <h2 className="column-title">{this.props.column.name}</h2>
                <Droppable droppableId={this.props.column._id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classnames('drop-area', { isDraggingOver: snapshot.isDraggingOver })}>
                            {_.map(this.props.tasks, (task, index) => {
                                return (
                                    <Task key={task._id} task={task} index={index} onClick={this.props.onTaskClick} />
                                );
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
