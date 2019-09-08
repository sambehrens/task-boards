import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import Button from '../ui/Button';
import Column from '../Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import BoardActions from '../../redux/actions/BoardActions';
import TaskActions from '../../redux/actions/TaskActions';
import ColumnActions from '../../redux/actions/ColumnActions';

export class BoardPage extends Component {
    componentDidMount() {
        this.props.boardActions.get(this.props.match.params.id);
        this.props.columnActions.filter({ boardId: this.props.match.params.id });
        this.props.taskActions.filter({ boardId: this.props.match.params.id });
    }

    onAddTaskClick = () => {};

    onDragEnd = result => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }

        const sourceTaskIds = _.clone(this.props.columns[source.droppableId].taskIds);
        sourceTaskIds.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceTaskIds.splice(destination.index, 0, draggableId);
            this.props.columnActions.changeTaskIndex(destination.droppableId, sourceTaskIds);
        } else {
            const destinationTaskIds = _.clone(this.props.columns[destination.droppableId].taskIds);
            destinationTaskIds.splice(destination.index, 0, draggableId);
            this.props.columnActions.changeTaskColumn(
                {
                    columnId: source.droppableId,
                    taskIds: sourceTaskIds,
                    originalTaskIds: this.props.columns[source.droppableId].taskIds
                },
                {
                    columnId: destination.droppableId,
                    taskIds: destinationTaskIds,
                    originalTaskIds: this.props.columns[destination.droppableId].taskIds
                }
            );
        }
    };

    render() {
        return (
            <div className="board-page">
                <h1>{_.get(this.props.board, 'name')}</h1>
                <Button onClick={this.onAddTaskClick}>Add a task</Button>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {_.map(this.props.columns, column => (
                        <Column column={column} tasks={_.map(column.taskIds, id => this.props.tasks[id])} />
                    ))}
                </DragDropContext>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    board: state.boards[props.match.params.id],
    columns: state.columns,
    tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
    boardActions: bindActionCreators(BoardActions, dispatch),
    columnActions: bindActionCreators(ColumnActions, dispatch),
    taskActions: bindActionCreators(TaskActions, dispatch)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BoardPage)
);
