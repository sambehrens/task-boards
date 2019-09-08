import { getDefaultActions } from '../utils/ActionHelper';
import Types from './types';

export default {
    ...getDefaultActions(Types.task),

    changeIndex(taskId, index) {
        return {
            type: 'CHANGE_TASK_INDEX',
            payload: { taskId, index }
        };
    },

    changeColumnId(taskId, columnId) {
        return {
            type: 'CHANGE_TASK_COLUMN',
            payload: { taskId, columnId }
        };
    }
};
