import React from 'react';
import API from '../api';
import {Link} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import {Player, ControlBar, BigPlayButton} from 'video-react';
import ReactCursorPosition from 'react-cursor-position';
import Scrubber_video from './scrubber';

function create_containers(elem, click){
  return(
        <>
        <div className="container_video" onClick={click} id={elem.url} frame={elem.frame}>
          <div style={{pointerEvents: 'none'}}>
            <Player src={elem.url} startTime={elem.frame/25} muted={true} playsInline={true} preload='auto'>
              <ControlBar disableCompletely={true} className="my-class" />
              <BigPlayButton disabled={true}/>
            </Player>
          </div>
        </div>
        </>
      )
}

class Videos extends React.Component{

  constructor(props){
    super(props);
    this.state = {loaded: false, error_area: false, error_bodyPoints: false}
    this.onclick = this.onclick.bind(this);
  }

  componentDidMount(){
    if(this.props.location.state.x_origin<=0 &&
    this.props.location.state.y_origin<=0 &&
  this.props.location.state.x_target<=0 &&
  this.props.location.state.y_target<=0){
    this.setState({loaded: true, error_area: true})
  } else if(this.props.location.state.elements.length===0){
    this.setState({loaded: true, error_bodyPoints: true})
  } else {
    API.getVideos(this.props.location.state.x_origin,
      this.props.location.state.y_origin,
      this.props.location.state.x_target,
      this.props.location.state.y_target,
      this.props.location.state.image.split('/')[3].split('.')[0],
      this.props.location.state.elements)
    .then(c => {
      this.setState({list: c, loaded: true, selected: false})
    })
  }}

  onclick(elem){
    this.setState({selected: elem.currentTarget.id, frame: elem.currentTarget.attributes.frame.value, height: elem.currentTarget.lastChild.lastChild.firstChild.videoHeight, width: elem.currentTarget.lastChild.lastChild.firstChild.videoWidth, duration: elem.currentTarget.lastChild.lastChild.firstChild.duration})
  }

  render() {

    return(
      <>
      {!this.state.loaded &&
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
      {this.state.error_area && this.state.loaded &&
        <div className="loader">
          <p className="error">Wrong area selection</p>
          <Link to={{pathname: '/query', state: {image: this.props.location.state.image}}}>
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-bar-left" fill="grey" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </Link>
        </div>
      }
      {this.state.error_bodyPoints && this.state.loaded &&
        <div className="loader">
          <p className="error">No joint selected</p>
          <Link to={{pathname: '/query', state: {image: this.props.location.state.image}}}>
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-bar-left" fill="grey" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </Link>
        </div>
      }
      {!this.state.error_area && !this.state.error_bodyPoints && this.state.loaded &&
        <>
        <Col xs={11} sm={11} md={8} lg={7} xl={7}>
          {!this.state.selected  && <div className="waiting_box_empty"></div>}
          {this.state.selected  &&
            <Scrubber_video src={this.state.selected} frame={this.state.frame} height={this.state.height} width={this.state.width} duration={this.state.duration}/>
            }
        </Col>
        <Col xs={8} sm={7} md={3} lg={3} xl={2} className="videos_container">
          {this.state.list.map(c => create_containers(c, this.onclick))}
        </Col>
        </>
      }
      </>
    )
  }
}

export default Videos;
