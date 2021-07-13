import React from 'react';
import {Col, Row} from 'react-bootstrap';
import { Switch, Route, Link, Redirect} from "react-router-dom";

function importAll(r) {
  return r.keys().map(r);
}

function camera_views_mapping(e, f, c){
  return <Col xs={12} sm={11} md={9} lg={7} xl={4} className="box_single_view">
            <Link to={{pathname: '/query', state: {image: e}}}>
              <img src={e} onClick={c} onLoad={f} className="views"/>
            </Link>
          </Col>
}

class CameraViews extends React.Component{

  constructor(props){
    super(props);
    this.state = {wait: true, loaded: false, change: false}
    this.count = 0;
    this.max_count = 0;
    this.onload = this.onload.bind(this);
    this.onclick = this.onclick.bind(this);
  }

  componentDidMount(){

    const images = importAll(require.context('../../../data/cameraImages/', false, /\.(png|jpe?g)$/));

    this.max_count = images.length;
    this.setState({images: images, wait: false})
  }

  onload(){
    this.count++
    if(this.count === this.max_count){
      this.setState({ loaded: true})
    }
  }

  onclick(image){
    this.setState({selected: image.target.src, change: true})
  }

  render() {
    return(
      <>
        {!this.state.loaded && !this.state.change &&
          <>
          <div className="black"/>
          <div className="loader_box">
            <div class="loader">
              <div class="item item-1"></div>
              <div class="item item-2"></div>
              <div class="item item-3"></div>
              <div class="item item-4"></div>
            </div>
          </div>
          </>
        }
        {!this.state.wait && !this.state.change &&
          this.state.images.map(c => camera_views_mapping(c,this.onload, this.onclick))
        }
      </>
    )
  }
}

export default CameraViews
