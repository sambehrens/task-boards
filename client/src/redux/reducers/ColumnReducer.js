import { createReducer } from '../utils/ReducerHelper';
import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {};

export default createReducer(initialState, {
    CREATE_TASK_SUCCESS(state, action) {
        return update(state, {
            [action.payload.column._id]: { $set: action.payload.column }
        });
    },

    CHANGE_TASK_INDEX(state, action) {
        return update(state, {
            [action.payload.columnId]: { $merge: { taskIds: action.payload.taskIds } }
        });
    },

    CHANGE_TASK_COLUMN(state, action) {
        return update(state, {
            [action.payload.source.columnId]: { $merge: { taskIds: action.payload.source.taskIds } },
            [action.payload.destination.columnId]: { $merge: { taskIds: action.payload.destination.taskIds } }
        });
    },

    MOVE_TASKS_SUCCESS(state, action) {
        return update(state, {
            [action.payload.sourceColumn._id]: { $set: action.payload.sourceColumn },
            [action.payload.destinationColumn._id]: { $set: action.payload.destinationColumn }
        });
    },

    MOVE_TASKS_FAIL(state, action) {
        return update(state, {
            [action.payload.source.columnId]: { $merge: { taskIds: action.payload.source.originalTaskIds } },
            [action.payload.destination.columnId]: { $merge: { taskIds: action.payload.destination.originalTaskIds } }
        });
    },

    FILTER_COLUMNS_SUCCESS(state, action) {
        return update(state, {
            $set: _.keyBy(action.payload, '_id')
        });
    },

    GET_COLUMN_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    EDIT_COLUMN_SUCCESS(state, action) {
        return update(state, {
            [action.payload._id]: { $merge: action.payload }
        });
    },

    DELETE_COLUMN_SUCCESS(state, action) {
        return update(state, {
            test: { $set: action.payload }
        });
    },

    GET_COLUMN_ERRORS(state, action) {
        return update(state, {
            errors: { $set: action.payload }
        });
    }
});
