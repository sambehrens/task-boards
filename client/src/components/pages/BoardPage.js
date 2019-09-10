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
import NewTaskModal from '../NewTaskModal';
import ViewTaskModal from '../ViewTaskModal';
import Utils from '../../utils/Utils';

export class BoardPage extends Component {
    state = { showNewTaskModal: false, showViewTaskModal: false };

    componentDidMount() {
        if (Utils.getUrlParameter('task', this.props.location.search)) {
            this.setState({ showViewTaskModal: true });
        }
        this.props.boardActions.get(this.props.match.params.id);
        this.props.columnActions.filter({ boardId: this.props.match.params.id });
        this.props.taskActions.filter({ boardId: this.props.match.params.id });
    }

    onAddTaskClick = () => {
        this.setState({ showNewTaskModal: true, showViewTaskModal: false });
    };

    onAddTaskSubmit = values => {
        this.setState({ showNewTaskModal: false });
        this.props.taskActions.create(
            _.assign({}, values, {
                columnId: _.get(_.find(this.props.columns, 'startColumn'), '_id'),
                boardId: this.props.match.params.id
            })
        );
    };

    onTaskClick = evt => {
        evt.preventDefault();
        if (evt.currentTarget.id) {
            Utils.setUrlParameter('task', evt.currentTarget.id, this.props.history);
            this.setState({ showViewTaskModal: true, showNewTaskModal: false });
        }
    };

    onCloseTask = () => {
        this.setState({ showViewTaskModal: false });
        Utils.clearUrlParameters(this.props.history);
    };

    taskChangedPosition(source, destination) {
        return source.droppableId !== destination.droppableId || source.index !== destination.index;
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result;
        if (!destination || !this.taskChangedPosition(source, destination)) {
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
                <h1 className="board-name">{_.get(this.props.board, 'name')}</h1>
                <div>
                    <Button onClick={this.onAddTaskClick}>Add a task</Button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="columns">
                        {_.map(this.props.columns, column => (
                            <Column
                                key={column._id}
                                column={column}
                                onTaskClick={this.onTaskClick}
                                tasks={_.reduce(
                                    column.taskIds,
                                    (result, id) => {
                                        if (this.props.tasks[id]) {
                                            result.push(this.props.tasks[id]);
                                            return result;
                                        }
                                        return result;
                                    },
                                    []
                                )}
                            />
                        ))}
                    </div>
                </DragDropContext>
                {this.state.showNewTaskModal ? (
                    <NewTaskModal
                        onSubmit={this.onAddTaskSubmit}
                        onCancel={() => this.setState({ showNewTaskModal: false })}></NewTaskModal>
                ) : null}
                {this.state.showViewTaskModal ? (
                    <ViewTaskModal
                        onCancel={this.onCloseTask}
                        task={
                            this.props.tasks[Utils.getUrlParameter('task', this.props.location.search)]
                        }></ViewTaskModal>
                ) : null}
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
