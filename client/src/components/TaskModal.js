import React, { Component, Fragment } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import TextArea from './ui/TextArea';
import _ from 'lodash';
import ConfirmButton from './ui/ConfirmButton';

export class TaskModal extends Component {
    onChange = evt => {
        evt.persist();
        this.props.onChange(evt);
    };

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                <div className="new-task-modal">
                    <h2>{this.props.title}</h2>
                    <form onSubmit={this.props.onSubmit}>
                        <TextArea
                            id="description"
                            value={_.get(this.props.editedFields, 'description') || this.props.task.description || ''}
                            onChange={this.onChange}
                            label="Description"
                            placeholder="Description"
                            present={this.props.present}
                            markdown />
                        {this.props.present ? (
                            <Fragment>
                                <Button onClick={this.props.onEditClick} className="form-button form-button-right">
                                    Edit
                                </Button>
                                <ConfirmButton onConfirm={() => this.props.onDeleteClick(this.props.task._id)} className="form-button" kind="secondary" message={"Are you sure you want to delete this task?"}>
                                    Delete
                                </ConfirmButton>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button type="submit" className="form-button form-button-right">
                                    Save
                                </Button>
                                <Button onClick={this.props.onCancel} className="form-button" kind="secondary">
                                    Cancel
                                </Button>
                            </Fragment>
                        )}
                    </form>
                </div>
            </Modal>
        );
    }
}

export default TaskModal;
