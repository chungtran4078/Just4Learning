import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

class Form extends Component {

    constructor(props) { 
        super(props);
        var maxId = this.getMaxId();
        this.props.updateMaxId(maxId);
    }

    getMaxId() {
        var maxId = 0;
        var users = this.props.data;
        if(users.length > 0) {
            var max = users.reduce(function(prev, current) {
                if (+current.id > +prev.id) {
                    return current;
                } else {
                    return prev;
                }
            });
            maxId = max.id;
        }
        return maxId;
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.updateSelectedUser(this.props.selectedUser, name, value);
        
    }

    handleAddUser = (e) => { 
        e.preventDefault();
        if(this.props.selectedUser.id !== '') {
            var index = this.props.data.findIndex(user => user.id === this.props.selectedUser.id);
            this.props.editUser(this.props.selectedUser, index);
        } else {
            var maxId = this.props.maxId + 1;
            this.props.updateSelectedUser(this.props.selectedUser, 'id', maxId);
            this.props.updateMaxId(maxId);
            setTimeout(() => {
                this.props.addUser(this.props.selectedUser);
            }, 1);
        }
        setTimeout(() => {
            this.props.clearSelectedUser();
        }, 1);
    }

    render() {
        return (
            <ReactCSSTransitionGroup
            component={React.Fragment} 
            transitionName="form"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <div className="col-md-3 order-md-2">
                <form onSubmit={(e) => this.handleAddUser(e)}>
                    <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input ref="nameRef" onChange = {(e)=> this.handleChange(e)} value={this.props.selectedUser.name} type="text" className="form-control" name="name" required/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input ref="telRef" onChange = {(e)=> this.handleChange(e)} value={this.props.selectedUser.tel} type="text" className="form-control" name="tel" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Quyền:</label>
                        <select ref="permissionRef" onChange = {(e)=> this.handleChange(e)} value={this.props.selectedUser.permission} className="form-control" name="permission" required>
                            <option></option>
                            {this.props.permissions.map((item, i) => <option value={i} key={i}>{item}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            </ReactCSSTransitionGroup>
        );
    }
}

var mapStateToProp = (state) => {
    return {
        selectedUser: state.selectedUserReducer,
        permissions: state.permisionListReducer,
        data: state.userReducer,
        maxId: state.maxIdReducer
    }
}

var mapDispatchToProp = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch({
                type: 'ADD_USER',
                user: user
            });
        },
        editUser: (user, index) => {
            dispatch({
                type: 'UPDATE_USER',
                user: user,
                index: index
            });
        },
        getMaxId: (users) => {
            dispatch({
                type: 'GET_MAXID',
                users: users
            })
        },
        updateMaxId: (newMaxId) => {
            dispatch({
                type: 'UPDATE_MAXID',
                newMaxId: newMaxId
            })
        },
        clearSelectedUser: () => {
            dispatch({
                type: 'REMOVE_SELECTED_USER'
            })
        },
        updateSelectedUser: (user, name, value) => {
            dispatch({
                type: 'UPDATE_SELECTED_USER',
                user: user,
                name: name,
                value: value
            });
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(Form);