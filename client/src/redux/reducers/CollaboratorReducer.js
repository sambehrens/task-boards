import { createReducer } from '../utils/ReducerHelper';
import update from 'immutability-helper';

const initialState = {
    errors: {}
};

export default createReducer(initialState, {
    CREATE_COLLABORATOR_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    FILTER_COLLABORATORS_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    GET_COLLABORATOR_SUCCESS(state, action) {
        return update(state, {
            [action.payload._id]: { $set: action.payload }
        });
    },

    EDIT_COLLABORATOR_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    DELETE_COLLABORATOR_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    GET_COLLABORATOR_ERRORS(state, action) {
        return update(state, {
            errors: { $set: action.payload }
        });
    }
});
