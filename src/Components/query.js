import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import Skeleton from './skeleton';
import RectangleSelection from "./rectangle-selection";

let mapping_key_points={
    nose: 0,
    neck: 1,
    left_shoulder: 5,
    left_elbow: 6,
    left_hand: 7,
    right_shoulder: 2,
    right_elbow: 3,
    right_hand: 4,
    mid_hip: 8,
    left_hip: 12,
    left_knee: 13,
    left_ankle: 14,
    right_hip: 9,
    right_knee: 10,
    right_ankle: 11,
}

class Query extends React.Component{

  constructor(props){
    super(props)
    this.elements = []
    this.image = this.props.location.state.image
    this.handlePoints = this.handlePoints.bind(this)
    this.img = React.createRef();
    this.state = {}
  }

  handlePoints(elements){
    this.elements = elements;
  }

  render(){

    return(
      <>
      <Col xs={12} sm={12} md={12} lg={8} xl={6}>
      <RectangleSelection
      onSelect={(origin,target) => {
       this.setState({
          x_origin: Math.min(origin[0]-this.img.current.offsetLeft, target[0]-this.img.current.offsetLeft)/this.img.current.offsetWidth*this.img.current.naturalWidth,
          y_origin: Math.min(origin[1]-this.img.current.offsetTop, target[1]-this.img.current.offsetTop)/this.img.current.offsetHeight*this.img.current.naturalHeight,
          x_target: Math.max(origin[0]-this.img.current.offsetLeft, target[0]-this.img.current.offsetLeft)/this.img.current.offsetWidth*this.img.current.naturalWidth,
          y_target: Math.max(origin[1]-this.img.current.offsetTop, target[1]-this.img.current.offsetTop)/this.img.current.offsetHeight*this.img.current.naturalHeight,
       });
      }}
      style={{
        backgroundColor: "rgba(0,0,255,0.4)",
        borderColor: "blue",
        zIndex: 2
      }}
     >
     <div className='scrubber_container'>
         <img ref={this.img} src={this.image} className="choosen_view"/>
         </div>
    </RectangleSelection>
    </Col>
      <Col xs={10} sm={9} md={8} lg={3} xl={3}>
          <Skeleton handle={this.handlePoints}/>
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Link to={{pathname: '/videos', state: {image: this.image,
          elements: this.elements.map(c => mapping_key_points[c.toString()]),
            x_origin: this.state.x_origin, y_origin: this.state.y_origin, x_target: this.state.x_target, y_target: this.state.y_target}}}>
            <div className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="96" fill="white" class="bi bi-cloud-arrow-down-fill onhover" viewBox="0 0 16 16">
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
            </svg>
            </div>
          </Link>
      </Col>
      </>
    )
  }
}

export default Query;
