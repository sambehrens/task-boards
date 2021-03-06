import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

const propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['medium', 'large']),
    kind: PropTypes.oneOf(['primary', 'secondary']),
    type: PropTypes.string,
    formButton: PropTypes.bool,
    id: PropTypes.string,
    icon: PropTypes.string,
    width: PropTypes.string,
    autoFocus: PropTypes.bool
};

const defaultProps = {
    size: 'medium',
    kind: 'primary',
    type: 'button'
};

class Button extends Component {
    getIconMarkup() {
        if (this.props.icon) {
            return <i className="material-icons button-icon">{this.props.icon}</i>;
        }
    }

    getContent() {
        return (
            <>
                {this.getIconMarkup()} {this.props.children}
            </>
        );
    }

    getWidth() {
        if (this.props.width) {
            return { width: this.props.width, paddingLeft: 'unset', paddingRight: 'unset' };
        }
    }

    render() {
        const { size, kind, formButton, className, icon, width, ...buttonProps } = this.props;
        return (
            <button
                className={classnames(
                    'button',
                    size,
                    kind,
                    {
                        'form-button': formButton,
                        icon: icon,
                        'icon-no-content': icon && _.isEmpty(_.filter(this.props.children, child => child))
                    },
                    className
                )}
                style={this.getWidth()}
                {...buttonProps}>
                {this.getContent()}
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
