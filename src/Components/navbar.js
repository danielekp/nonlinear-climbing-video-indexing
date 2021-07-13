import React from 'react';
import {Col, Row, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { withRouter } from "react-router-dom"

class Navbars extends React.Component{

  constructor(props){
    super(props);
    this.state = {home: true}
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount(){
    this.props.history.listen(() => {
      if(window.location.pathname!=='/views'){
        this.setState({home:false})
      } else {
        this.setState({home:true})
      }
    })
  }

  goBack(){
    this.props.history.goBack();
  }

  render(){
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        {this.state.home &&
          <a href="/views">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-grid-fill" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
          </svg>
          </a>
        }
        {!this.state.home &&
          <a class="myClickableThingy" onClick={this.goBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
        <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
      </svg>
      </a>
      }
        <Navbar.Brand><a class="title_nav">NONLINEAR CLIMBING VIDEO INDEXING</a></Navbar.Brand>
      </Navbar>
    )
  }

}

export default withRouter(Navbars);
