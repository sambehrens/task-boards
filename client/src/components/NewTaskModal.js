import React, { Component } from 'react';
import Button from './ui/Button';
import Modal from './ui/modal/Modal';
import Field from './ui/Field';
import TextArea from './ui/TextArea';

export class NewTaskModal extends Component {
    onChange = evt => {
        evt.persist();
        this.props.onChange(evt);
    };

    render() {
        return (
            <Modal onCancel={this.props.onCancel}>
                <div className="new-task-modal">
                    <h2>Create a new task</h2>
                    <form onSubmit={this.props.onSubmit}>
                        <Field
                            id="name"
                            value={this.props.name}
                            label="Name"
                            onChange={this.onChange}
                            placeholder="Name"
                        />
                        <TextArea
                            id="description"
                            value={this.props.description}
                            onChange={this.onChange}
                            label="Description"
                            placeholder="Description"></TextArea>
                        <Field
                            id="estimate"
                            value={this.props.estimate}
                            label="Estimate"
                            onChange={this.onChange}
                            placeholder="Estimate"
                            type="number"
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default NewTaskModal;
