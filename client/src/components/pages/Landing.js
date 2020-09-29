import React, { Component } from 'react';
import Button from '../ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import BoardActions from '../../redux/actions/BoardActions';
import { Link, withRouter } from 'react-router-dom';
import Field from '../ui/Field';

export class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boardName: ''
        };
    }

    componentDidMount() {
        const boardIdsString = window.localStorage.getItem('boards') || '';
        const boardIds = _.filter(boardIdsString.split(','));
        if (boardIds) {
            this.props.boardActions.filter({ _id: boardIds });
        }
    }

    onNewBoardClick = (e) => {
        e.preventDefault();
        this.props.boardActions.create({ name: this.state.boardName }, this.onNewBoardSuccess);
    };

    onNewBoardSuccess = (board) => {
        const boardIdsString = window.localStorage.getItem('boards') || '';
        const boardIds = _.filter(boardIdsString.split(','));
        boardIds.unshift(board._id);
        window.localStorage.setItem('boards', boardIds);
    };

    getBoards() {
        if (this.props.boards) {
            return _.map(this.props.boards, board => (
                <Link key={board._id} to={board._id} className={'button secondary medium board-link'}>
                    {board.name}
                </Link>
            ));
        }
    }

    render() {
        return (
            <div className="landing-page">
                <div className="landing-controls">
                    <h1>Welcome to task boards</h1>
                    <p className='right'>By Sam Behrens</p>
                    <div className='clear'/>
                    <form onSubmit={this.onNewBoardClick}>
                        <Field id='boardName' value={this.state.boardName}
                               onChange={(e) => this.setState({ boardName: e.target.value })} placeholder="New board name"/>
                        <Button type='submit' className="form-button">Create</Button>
                    </form>
                    <div className='clear'/>
                    <h2>Existing boards:</h2>
                    <hr/>
                    {this.getBoards()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    boards: state.boards
});

const mapDispatchToProps = dispatch => ({
    boardActions: bindActionCreators(BoardActions, dispatch)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Landing)
);
