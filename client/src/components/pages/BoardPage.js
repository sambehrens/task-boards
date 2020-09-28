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
import TaskModal from '../TaskModal';
import ViewTaskModal from '../ViewTaskModal';
import Utils from '../../utils/Utils';
import PageMessage from '../ui/PageMessage';

export class BoardPage extends Component {
    state = {
        showNewTaskModal: false,
        showViewTaskModal: false,
        showErrorPageMessage: false,
        errorMessage: '',
        newTask: { description: '' }
    };

    componentDidMount() {
        const boardId = this.props.match.params.id;
        if (Utils.getUrlParameter('task', this.props.location.search)) {
            this.setState({ showViewTaskModal: true });
        }
        this.props.boardActions.get(boardId, this.onGetBoardSuccess);
        this.props.columnActions.filter({ boardId: boardId });
        this.props.taskActions.filter({ boardId: boardId });
    }

    componentDidUpdate() {
        const urlTask = Utils.getUrlParameter('task', this.props.location.search);
        if (this.state.showViewTaskModal !== !!urlTask) {
            this.setState({ showViewTaskModal: !!urlTask });
        }
    }

    componentWillUnmount() {
        if (this.pageMessageTimeout) {
            clearTimeout(this.pageMessageTimeout);
        }
    }

    onGetBoardSuccess = () => {
        const boardId = this.props.match.params.id;
        const boardIds = window.localStorage.getItem('boards') || [];
        if (!_.includes(boardIds, boardId)) {
            boardIds.push(boardId);
            window.localStorage.setItem('boards', boardIds);
        }
    };

    onAddTaskClick = () => {
        this.setState({ showNewTaskModal: true, showViewTaskModal: false });
    };

    onAddTaskChange = evt => {
        this.setState(state => ({
            newTask: _.assign({}, state.newTask, { [evt.target.id]: evt.target.value })
        }));
    };

    onAddTaskSubmit = evt => {
        evt.preventDefault();
        this.setState({ showNewTaskModal: false, newTask: { description: '' } });
        this.props.taskActions.create(
            _.assign({}, this.state.newTask, {
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

    onEditTaskSubmit = (id, editedTask) => {
        this.props.taskActions.edit(id, editedTask);
    };

    onDeleteClick = (id) => {
        this.props.taskActions.delete(id);
        this.setState({ showViewTaskModal: false });
        Utils.clearUrlParameters(this.props.history);
    };

    taskChangedPosition(source, destination) {
        return source.droppableId !== destination.droppableId || source.index !== destination.index;
    }

    onChangeColumnFail = response => {
        this.setState({ showErrorPageMessage: true, errorMessage: response.data.message });
        if (this.pageMessageTimeout) {
            clearTimeout(this.pageMessageTimeout);
        }
        this.pageMessageTimeout = setTimeout(() => this.setState({ showErrorPageMessage: false }), 10000);
    };

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
                draggableId,
                {
                    columnId: source.droppableId,
                    taskIds: sourceTaskIds,
                    originalTaskIds: this.props.columns[source.droppableId].taskIds
                },
                {
                    columnId: destination.droppableId,
                    taskIds: destinationTaskIds,
                    originalTaskIds: this.props.columns[destination.droppableId].taskIds
                },
                _.noop,
                this.onChangeColumnFail
            );
        }
    };

    render() {
        return (
            <div className="board-page">
                <h1 className="board-name">{_.get(this.props.board, 'name')}</h1>
                <div className="controls-row">
                    <Button onClick={this.onAddTaskClick}>Add a task</Button>
                </div>
                <div className="columns-wrapper">
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
                </div>
                {this.state.showNewTaskModal ? (
                    <TaskModal
                        onSubmit={this.onAddTaskSubmit}
                        onCancel={() => this.setState({ showNewTaskModal: false })}
                        onChange={this.onAddTaskChange}
                        task={this.state.newTask}
                        title="Create a new task" />
                ) : null}
                {this.state.showViewTaskModal ? (
                    <ViewTaskModal
                        onCancel={this.onCloseTask}
                        onEditSubmit={this.onEditTaskSubmit}
                        onDeleteClick={this.onDeleteClick}
                        task={
                            this.props.tasks[Utils.getUrlParameter('task', this.props.location.search)]
                        } />
                ) : null}
                {this.state.showErrorPageMessage ? <PageMessage>{this.state.errorMessage}</PageMessage> : null}
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
