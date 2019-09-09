import React, { Component } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import Field from './ui/Field';

export class NewTaskModal extends Component {
    state = { name: '', description: '', estimate: '' };

    onFieldChange = evt => {
        this.setState({ [evt.target.id]: evt.target.value });
    };

    onSubmit = evt => {
        evt.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                <div className="new-task-modal">
                    <h2>Create a new task</h2>
                    <form onSubmit={this.onSubmit}>
                        <Field id="name" value={this.state.name} label="Name" onChange={this.onFieldChange} />
                        <textarea
                            className="text-area"
                            id="description"
                            value={this.state.description}
                            onChange={this.onFieldChange}></textarea>
                        <Field
                            id="estimate"
                            value={this.state.estimate}
                            label="Estimate"
                            onChange={this.onFieldChange}
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default NewTaskModal;
