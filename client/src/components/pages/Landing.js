import React, { Component } from 'react';
import Button from '../ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import BoardActions from '../../redux/actions/BoardActions';
import { withRouter } from 'react-router-dom';

export class Landing extends Component {
    componentDidMount() {
        const boardIds = window.localStorage.getItem('boards');
        if (boardIds) {
            this.props.boardActions.filter({ _id: boardIds });
        }
    }

    onBoardClick = evt => {
        this.props.history.push(evt.target.id);
    };

    getBoards() {
        if (this.props.boards) {
            return _.map(this.props.boards, board => (
                <div key={board._id} id={board._id} onClick={this.onBoardClick}>
                    {board.name}
                </div>
            ));
        }
    }

    render() {
        return (
            <div className="landing-page">
                <h1>Welcome to whatever this is called</h1>
                <Button>Create a new board</Button>
                {this.getBoards()}
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
