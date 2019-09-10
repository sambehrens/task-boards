import { getDefaultActions, getErrors } from '../utils/ActionHelper';
import Types from './types';
import axios from 'axios';
import _ from 'lodash';

export default {
    ...getDefaultActions(Types.column),

    changeTaskIndex: (columnId, taskIds, onSuccess = _.noop, onFail = _.noop) => async dispatch => {
        dispatch({
            type: 'CHANGE_TASK_INDEX',
            payload: { columnId, taskIds }
        });
        try {
            const res = await axios.patch(`/api/${Types.column.url}/${columnId}`, { taskIds });
            dispatch({
                type: Types.column.edit.SUCCESS,
                payload: res.data
            });
            onSuccess(res);
        } catch (err) {
            getErrors(dispatch, Types.column, err);
            onFail(err);
        }
    },

    changeTaskColumn: (taskId, source, destination, onSuccess = _.noop, onFail = _.noop) => async dispatch => {
        const data = {
            source,
            destination,
            taskIds: [taskId]
        };
        dispatch({
            type: 'CHANGE_TASK_COLUMN',
            payload: data
        });
        try {
            const res = await axios.post(
                `/api/${Types.column.url}/move-tasks`,
                _.omit(data, 'source.originalTaskIds', 'destination.originalTaskIds')
            );
            dispatch({
                type: 'MOVE_TASKS_SUCCESS',
                payload: res.data
            });
            onSuccess(res);
        } catch (err) {
            dispatch({
                type: 'MOVE_TASKS_FAIL',
                payload: data
            });
            getErrors(dispatch, Types.column, err);
            onFail(err);
        }
    }
};
