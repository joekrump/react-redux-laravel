import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        authenticated: false
      }
    }
  }
  renderNavbarRight(){
    console.log(this.props);
    if(this.props.authenticated){
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown" key={1}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
               {this.props.userinfo.name} <span className="caret"></span>
            </a>
            <ul className="dropdown-menu" role="menu">
                <li><Link to="/logout"><i className="fa fa-btn fa-sign-out"></i>Logout</Link></li>
            </ul>
          </li>
        </ul>
      );
    } 
    else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li>
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      );
    }
  } 

  renderLinks(){
    if(this.props.authenticated){
      return (
        <li className="nav-item pull-xs-left" key={2}>
          <Link className="nav-item nav-link" to="/post/add">New Post</Link>
        </li>
      );
    }
  }

  render (){
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                  <span className="sr-only">Toggle Navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">My Blog</Link>
          </div>
          <div className="collapse navbar-collapse" id="app-navbar-collapse">
            <ul className="nav navbar-nav">
              {this.renderLinks()}
            </ul>
            
            {this.renderNavbarRight()}
          </div>
        </div>
      </nav>
      )

  }


}
function mapStateToProps(state){
 return {
   userinfo: state.auth.userinfo,
   authenticated: state.auth.authenticated
 };
}

export default connect(mapStateToProps, actions)(Header);
