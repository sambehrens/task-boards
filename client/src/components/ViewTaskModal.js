import React, { Component } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import ReactMarkdown from 'react-markdown';

export class ViewTaskModal extends Component {
    render() {
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
