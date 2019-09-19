import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="footer-line"></div>
                <div className="footer">
                    <ul>
                        <li>
                            <a
                                href="https://github.com/sambehrens/"
                                className="link tertiary footer-link"
                                target="_blank"
                                rel="noopener noreferrer">
                                Sam Behrens
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;
