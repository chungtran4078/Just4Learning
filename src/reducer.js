import DataUser from './data.json';
var redux = require('redux');


var userReducer = (state = DataUser, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.user];
        case 'UPDATE_USER':
            var newState = [...state];
            newState[action.index] = action.user;
            return newState;
        case 'REMOVE_USER':
            return state.filter((user) => user.id !== action.id);
        default:
            return state;
    }
}

var isAddUserReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_ADD':
            return !state;
        case 'CHANGE_STATUS':
            return action.value;
        default:
            return state;
    }
} 

var searchKeyWordReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_KEYWORD':
            return action.keyword;
        default:
            return state;
    }
}  

var maxIdReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_MAXID':
            return action.newMaxId;
        default:
            return state;
    }
} 


var selectedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return action.user;
        case 'UPDATE_SELECTED_USER':
            return {...state, [action.name] : action.value};
        case 'REMOVE_SELECTED_USER':
            return {id: '', name: '', tel: '', permission: ''};
        default:
            return state;
    }
} 

var permisionListReducer = (state = ["Admin", "Moderator", "Normal User"], action) => {
    return state;
}

var reducer = redux.combineReducers({
    userReducer,
    isAddUserReducer,
    searchKeyWordReducer,
    maxIdReducer,
    selectedUserReducer,
    permisionListReducer
});

export default reducer;