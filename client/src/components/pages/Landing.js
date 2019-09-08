import React, { Component } from 'react';
import Button from '../ui/Button';

export class Landing extends Component {
    render() {
        return (
            <div className="landing-page">
                <h1>Welcome to whatever this is called</h1>
                <Button>Create a new board</Button>
            </div>
        );
    }
}

export default Landing;
