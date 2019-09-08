import { createReducer } from '../utils/ReducerHelper';
import update from 'immutability-helper';

const initialState = {
    errors: {}
};

export default createReducer(initialState, {
    CREATE_BOARD_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    FILTER_BOARDS_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    GET_BOARD_SUCCESS(state, action) {
        return update(state, {
            [action.payload._id]: { $set: action.payload }
        });
    },

    EDIT_BOARD_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    DELETE_BOARD_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    GET_BOARD_ERRORS(state, action) {
        return update(state, {
            errors: { $set: action.payload }
        });
    }
});
