import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import {connect} from 'react-redux';

function RowItem(props) {
    var alertOption = {
        title: 'Warning!',
        message: 'Bạn chắc chắn muốn xóa?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => props.handleRemoveUserProp()
          },
          {
            label: 'No'
          }
        ]
    }

    var handleEditUser = () => {
        props.handleEditUserProp();
    }

    var handleRemoveUser = () => {
        confirmAlert(alertOption);
    }

    return (
        <tr>
            <td>{props.userProp.id}</td>
            <td>{props.userProp.name}</td>
            <td>{props.userProp.tel}</td>
            <td>{props.permissions[parseInt(props.userProp.permission, 10)]}</td>
            <td>
                <div className="btn-group">
                    <button onClick={()=> handleEditUser()} className="btn btn-sm btn-warning">Sửa</button>
                    <button onClick={()=> handleRemoveUser()} className="btn btn-sm btn-danger">Xóa</button>
                </div>
            </td>
        </tr>
    )
}

class Table extends Component {
    
    handleEditUser = (user) => {
        this.props.dispatch({type: 'CHANGE_STATUS', value: true});
        this.props.dispatch({type: 'SET_SELECTED_USER', user: user});
    }

    handleRemoveUser = (id) => { 
        this.props.dispatch({
            type: 'REMOVE_USER', 
            id: id,
            user: this.props.data
        });
    }

    handleFilterData = () => {
        var users = this.props.data;
        var keyword = this.props.searchKeyword;
        return users.filter((user) => user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }

    render() {
        var data = this.handleFilterData();
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                
                    {data.map((user, key) => (
                    <ReactCSSTransitionGroup 
                    component={React.Fragment} 
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                    key={key}>
                        <RowItem
                        userProp={user}
                        permissions={this.props.permissions}
                        handleRemoveUserProp={()=> this.handleRemoveUser(user.id)}
                        handleEditUserProp={() => this.handleEditUser(user)} 
                        key={key}/>
                    </ReactCSSTransitionGroup>
                    ))}
                    
                </tbody>
            </table>
        );
    }
}

var mapStateToProp = (state) => {
    return {
      data: state.userReducer,
      permissions: state.permisionListReducer,
      selectedUser: state.selectedUserReducer,
      searchResult: state.searchResultReducer,
      searchKeyword: state.searchKeyWordReducer
    }
}

export default connect(mapStateToProp)(Table);