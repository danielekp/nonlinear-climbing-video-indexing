import React from 'react';
import './App.css';
import {Switch} from 'react-router';
import {Redirect, Route, BrowserRouter, Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row} from 'react-bootstrap';
import CameraViews from './Components/camera_views';
import Query from './Components/query';
import Videos from './Components/videos'
import Navbars from './Components/navbar'


class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <>
      <BrowserRouter>
        <Container fluid>
        <Navbars/>
        <Row className="justify-content-center box_views">
          <Switch>
            <Redirect exact from="/" to="views"/>
            <Route path="/views" component={CameraViews}>
            </Route>
            <Route path="/query" component={Query}>
            </Route>
            <Route path="/videos" component={Videos}>
            </Route>
          </Switch>
          </Row>
        </Container>
      </BrowserRouter>
      </>
    )
  }
}

export default App;
