import { createReducer } from '../utils/ReducerHelper';
import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {
    errors: {}
};

export default createReducer(initialState, {
    CREATE_TASK_SUCCESS(state, action) {
        return update(state, {
            [action.payload.task._id]: { $set: action.payload.task }
        });
    },

    FILTER_TASKS_SUCCESS(state, action) {
        return update(state, {
            $set: _.keyBy(action.payload, '_id')
        });
    },

    GET_TASK_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    EDIT_TASK_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    DELETE_TASK_SUCCESS(state, action) {
        return update(state, {
            [action.payload.task._id]: {
                $apply: tasks => {
                    let copy = _.assign({}, tasks);
                    delete copy.remove;
                    return copy;
                }
            }
        });
    },

    GET_TASK_ERRORS(state, action) {
        return update(state, {
            errors: { $set: action.payload }
        });
    }
});
