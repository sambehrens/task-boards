import React, { Component, Fragment } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import TextArea from './ui/TextArea';
import _ from 'lodash';
import ConfirmButton from './ui/ConfirmButton';

export class TaskModal extends Component {
    constructor(props) {
        super(props);

        this.shiftPressed = false;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keypress', this.onKeyPress);
        document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keypress', this.onKeyPress);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    onChange = (evt) => {
        evt.persist();
        this.props.onChange(evt);
    };

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.onSubmit();
    };

    onKeyDown = (e) => {
        if (e.key === 'Shift') {
            this.shiftPressed = true;
        }
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter' && this.shiftPressed) {
            e.preventDefault();
        }
    };

    onKeyUp = (e) => {
        if (e.key === 'Enter' && this.shiftPressed) {
            this.onSubmit(e);
        }
        else if (e.key === 'Shift') {
            this.shiftPressed = false;
        }
        else if (e.key === 'Escape') {
            this.props.onCancel();
        }
    };

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                <div className="new-task-modal">
                    {this.props.title ? <h2>{this.props.title}</h2> : null}
                    <form onSubmit={this.onSubmit}>
                        <TextArea
                            id="description"
                            value={this.props.edit ? _.get(this.props.editedFields, 'description') || '' : this.props.task.description || ''}
                            onChange={this.onChange}
                            placeholder="# Task description (markdown)"
                            present={this.props.present}
                            markdown />
                        {this.props.present ? (
                            <Fragment>
                                <Button onClick={this.props.onEditClick} className="form-button form-button-right">
                                    Edit
                                </Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button type="submit" className="form-button form-button-right">
                                    Save
                                </Button>
                                <Button onClick={this.props.onCancel} className="form-button" kind="secondary">
                                    Cancel
                                </Button>
                                <ConfirmButton onConfirm={() => this.props.onDeleteClick(this.props.task._id)} className="form-button" kind="secondary" message={"Are you sure you want to delete this task?"}>
                                    Delete
                                </ConfirmButton>
                            </Fragment>
                        )}
                    </form>
                </div>
            </Modal>
        );
    }
}

export default TaskModal;
