import React, {Component} from 'react';
import {connect} from 'react-redux';

function ButtonComponent(props) {

    var handleClick = () => { 
        props.toggleAddUserState();
        props.clearSelectedUser();
    }

    return (
        <button type="button" onClick={() => handleClick()} className="btn btn-primary btn-block">{props.text}</button>
    )
}
class Search extends Component {

    handleSearch = (keyword) => {
        this.props.setSearchKeyword(keyword);
    }
    
    render() {
        return (
            <div className="row mb-4">
                <div className="col">
                    <input onChange = {(event) => this.handleSearch(event.target.value)}type="text" className="form-control" placeholder="Nhập từ khóa..."/>

                </div>
                <div className="col text-right">
                    <ButtonComponent 
                    clearSelectedUser={this.props.clearSelectedUser}
                    toggleAddUserState = {this.props.toggleAddUserState} 
                    text={this.props.isAddUser ? "Đóng" : "Thêm người dùng"}/>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) => {
    return {
        isAddUser: state.isAddUserReducer,
        data: state.userReducer
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        toggleAddUserState: () => {
            dispatch({type: 'TOGGLE_ADD'});
        },
        clearSelectedUser: () => {
            dispatch({
                type: 'REMOVE_SELECTED_USER'
            })
        },
        setSearchKeyword: (keyword) => {
            dispatch({
                type: 'SET_KEYWORD',
                keyword: keyword
            });
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Search);