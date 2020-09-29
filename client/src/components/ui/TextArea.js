import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';

const propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.oneOf(['on', 'off']),
    spellCheck: PropTypes.oneOf(['true', 'false']),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    present: PropTypes.bool,
    markdown: PropTypes.bool
};

const defaultProps = {
    autoComplete: 'on',
    value: '',
    present: false,
    markdown: false
};

class TextArea extends Component {
    handleChange = evt => {
        evt.preventDefault();
        this.props.onChange(evt);
    };

    render() {
        const { style, present, editable, markdown, ...inputProps } = this.props;
        if (present) {
            return (
                <div style={style} className="field-wrapper editable-field-wrapper">
                    {this.props.label ? <p className="field-label">{this.props.label}</p> : null}
                    <span className="text-area-present">
                        {markdown ? <ReactMarkdown>{this.props.value}</ReactMarkdown> : <p>{this.props.value}</p>}
                    </span>
                </div>
            );
        }

        return (
            <div
                style={style}
                className={classnames('field-wrapper', this.props.className, {
                    'inline-field': this.props.sidebyside
                })}>
                {this.props.label ? <p className="field-label">{this.props.label}</p> : null}
                <div className="field-outer">
                    <textarea
                        {...inputProps}
                        className={classnames('text-area', { 'field-error-border': this.props.error })}
                    />
                    <p className="field-error-label">{this.props.error}</p>
                </div>
            </div>
        );
    }
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;
export default TextArea;
