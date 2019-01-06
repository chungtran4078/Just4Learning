import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Table from './components/Table';
import Search from './components/Search';
import {connect} from 'react-redux';

class App extends Component {

  showForm = () => {
    if(this.props.isAddUser) {
      return <Form/>
    }
    return;
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <div className="row main">
          <div className="col-md-12">
            <h4 className="mb-3">Danh sách</h4>
            <Search/>
          </div>
          <div className="col-md-12">
            <div className="row">
              {this.showForm()}
              <div className="col-md">
                <Table/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

var mapStateToProp = (state) => {
  return {
    isAddUser: state.isAddUserReducer,
    data: state.userReducer,
    // searchKeyword: state.searchKeyWordReducer,
    searchResult: state.searchResultReducer,
    maxId: state.maxIdReducer,
    selectedUser: state.selectedUserReducer,
    permissions: state.permisionListReducer
  }
}
export default connect(mapStateToProp)(App);
