import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer';
import CollaboratorReducer from './CollaboratorReducer';
import ColumnReducer from './ColumnReducer';
import TaskReducer from './TaskReducer';

export default combineReducers({
    boards: BoardReducer,
    collaborators: CollaboratorReducer,
    columns: ColumnReducer,
    tasks: TaskReducer
});
