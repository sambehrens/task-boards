export default {
    board: {
        url: 'boards',
        create: {
            SUCCESS: 'CREATE_BOARD_SUCCESS'
        },
        filter: {
            SUCCESS: 'FILTER_BOARDS_SUCCESS'
        },
        get: {
            SUCCESS: 'GET_BOARD_SUCCESS'
        },
        edit: {
            SUCCESS: 'EDIT_BOARD_SUCCESS'
        },
        delete: {
            SUCCESS: 'DELETE_BOARD_SUCCESS'
        },
        ERROR: 'GET_BOARD_ERRORS'
    },
    task: {
        url: 'tasks',
        create: {
            SUCCESS: 'CREATE_TASK_SUCCESS'
        },
        filter: {
            SUCCESS: 'FILTER_TASKS_SUCCESS'
        },
        get: {
            SUCCESS: 'GET_TASK_SUCCESS'
        },
        edit: {
            SUCCESS: 'EDIT_TASK_SUCCESS'
        },
        delete: {
            SUCCESS: 'DELETE_TASK_SUCCESS'
        },
        ERROR: 'GET_TASK_ERRORS'
    },
    collaborator: {
        url: 'collaborators',
        create: {
            SUCCESS: 'CREATE_COLLABORATOR_SUCCESS'
        },
        filter: {
            SUCCESS: 'FILTER_COLLABORATORS_SUCCESS'
        },
        get: {
            SUCCESS: 'GET_COLLABORATOR_SUCCESS'
        },
        edit: {
            SUCCESS: 'EDIT_COLLABORATOR_SUCCESS'
        },
        delete: {
            SUCCESS: 'DELETE_COLLABORATOR_SUCCESS'
        },
        ERROR: 'GET_COLLABORATOR_ERRORS'
    },
    column: {
        url: 'columns',
        create: {
            SUCCESS: 'CREATE_COLUMN_SUCCESS'
        },
        filter: {
            SUCCESS: 'FILTER_COLUMNS_SUCCESS'
        },
        get: {
            SUCCESS: 'GET_COLUMN_SUCCESS'
        },
        edit: {
            SUCCESS: 'EDIT_COLUMN_SUCCESS'
        },
        delete: {
            SUCCESS: 'DELETE_COLUMN_SUCCESS'
        },
        ERROR: 'GET_COLUMN_ERRORS'
    }
};
