import React, { Component } from 'react';
import Modal from './ui/modal/Modal';
import _ from 'lodash';
import TaskModal from './TaskModal';

export class ViewTaskModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            present: true,
            editedFields: {}
        };
    }

    onEditClick = evt => {
        evt.preventDefault();
        this.setState({ present: false });
    };

    onEditSubmit = evt => {
        evt.preventDefault();
        this.setState({ present: true, editedFields: {} });
        if (
            _.isEmpty(this.state.editedFields) ||
            _.isEqual(_.assign({}, this.props.task, this.state.editedFields), this.props.task)
        ) {
            return;
        }
        this.props.onEditSubmit(this.props.task._id, this.state.editedFields);
    };

    onCancel = () => {
        this.setState({ present: true, editedFields: {} });
        this.props.onCancel();
    };

    onChange = evt => {
        this.setState(state => ({
            editedFields: _.assign({}, state.editedFields, { [evt.target.id]: evt.target.value })
        }));
    };

    render() {
        if (!this.props.task || _.isEmpty(this.props.task)) {
            return (
                <Modal onCancel={this.props.onCancel}>
                    <div className="view-task-modal">Loading task</div>
                </Modal>
            );
        }

        return (
            <TaskModal
                onCancel={this.onCancel}
                onChange={this.onChange}
                onSubmit={this.onEditSubmit}
                onCancelEdit={this.onCancelEdit}
                onEditClick={this.onEditClick}
                onDeleteClick={this.props.onDeleteClick}
                task={this.props.task}
                editedFields={this.state.editedFields}
                present={this.state.present}
                title="Edit task"
            />
        );
    }
}

export default ViewTaskModal;
