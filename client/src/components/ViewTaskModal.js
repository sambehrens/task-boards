import React, { Component } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import ReactMarkdown from 'react-markdown';
import _ from 'lodash';

export class ViewTaskModal extends Component {
    render() {
        if (!this.props.task || _.isEmpty(this.props.task)) {
            return (
                <Modal onCancel={this.props.onCancel}>
                    <div className="view-task-modal">Loading task</div>
                </Modal>
            );
        }
        return (
            <Modal onCancel={this.props.onCancel}>
                <div className="view-task-modal">
                    <h2>{this.props.task.name}</h2>
                    <p>{this.props.task.estimate}</p>
                    <ReactMarkdown>{this.props.task.description}</ReactMarkdown>
                    <Button onClick={this.props.onCancel}>Close</Button>
                </div>
            </Modal>
        );
    }
}

export default ViewTaskModal;
