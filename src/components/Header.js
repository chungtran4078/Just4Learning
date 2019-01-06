import React, {Component} from 'react';
import logo from '../bootstrap-solid.svg';
class Header extends Component {
    render() {
        return (
            <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72"/>
        <h2>QLNV</h2>
        
      </div>

        );
    }
}

export default Header;