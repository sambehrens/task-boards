import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    onCancel: PropTypes.func
};

const modalRoot = document.getElementById('page-message-root');

class PageMessage extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    handleCancelClick = e => {
        e.stopPropagation();
        this.props.onCancel();
    };

    render() {
        return ReactDOM.createPortal(
            <div id="page-message" className="page-message" onClick={e => e.stopPropagation()}>
                {this.props.children}
            </div>,
            this.el
        );
    }
}

PageMessage.propTypes = propTypes;
export default PageMessage;
