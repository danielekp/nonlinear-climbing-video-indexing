import React from 'react';
import{Stage, Layer, Circle, Line} from 'react-konva';

const scale = 5.9

function create_Key_point(e){
  return <Circle {...e}/>
}

function create_limb(e){
  return <Line {...e}/>
}


class Skeleton extends React.Component{

  constructor(props){
    super(props);
    this.elements = []
    this.handlePoints = props.handle;
    this.state={
        nose: {onClick: (click => this.onclick('nose', this.state.nose)), x: 746/scale, y: 364/scale, fill: '#FFFFFF', radius: 7},
        neck: {x: 749/scale, y: 648/scale, fill: '#FFFFFF', radius: 4},
        left_shoulder: {onClick: (click => this.onclick('left_shoulder', this.state.left_shoulder)), x: 540/scale, y: 648/scale, fill: '#FFFFFF', radius: 7},
        left_elbow: {onClick: (click => this.onclick('left_elbow', this.state.left_elbow)), x: 429/scale, y: 950/scale, fill:'#FFFFFF', radius: 7},
        left_hand: {onClick: (click => this.onclick('left_hand', this.state.left_hand)), x: 311/scale, y: 1206/scale, fill: '#FFFFFF', radius: 7},
        right_shoulder: {onClick: (click => this.onclick('right_shoulder', this.state.right_shoulder)), x: 956/scale, y: 647/scale, fill: '#FFFFFF', radius: 7},
        right_elbow: {onClick: (click => this.onclick('right_elbow', this.state.right_elbow)), x: 1037/scale, y: 945/scale, fill:'#FFFFFF', radius: 7},
        right_hand: {onClick: (click => this.onclick('right_hand', this.state.right_hand)), x: 1095/scale, y: 1256/scale, fill: '#FFFFFF', radius: 7},
        mid_hip: {x: 738/scale, y: 1251/scale, fill: '#FFFFFF', radius: 4},
        left_hip: {onClick: (click => this.onclick('left_hip', this.state.left_hip)), x: 600/scale, y: 1234/scale, fill: '#FFFFFF', radius: 7},
        left_knee: {onClick: (click => this.onclick('left_knee', this.state.left_knee)), x: 585/scale, y: 1684/scale, fill: '#FFFFFF', radius: 7},
        left_ankle: {onClick: (click => this.onclick('left_ankle', this.state.left_ankle)), x: 542/scale, y: 2136/scale, fill: '#FFFFFF', radius: 7},
        right_hip: {onClick: (click => this.onclick('right_hip', this.state.right_hip)), x: 867/scale, y: 1258/scale, fill: '#FFFFFF', radius: 7},
        right_knee: {onClick: (click => this.onclick('right_knee', this.state.right_knee)), x: 873/scale, y: 1702/scale, fill: '#FFFFFF', radius: 7},
        right_ankle: {onClick: (click => this.onclick('right_ankle', this.state.right_ankle)), x: 884/scale, y: 2142/scale, fill: '#FFFFFF', radius: 7},
    }
    this.limbs = {
      nose_to_neck: { points: [this.state.nose.x, this.state.nose.y, this.state.neck.x, this.state.neck.y], stroke: this.state.nose.fill },
      neck_to_lShoulder: { points: [this.state.neck.x, this.state.neck.y, this.state.left_shoulder.x, this.state.left_shoulder.y], stroke: this.state.neck.fill },
      neck_to_rShoulder: { points: [this.state.neck.x, this.state.neck.y, this.state.right_shoulder.x, this.state.right_shoulder.y], stroke: this.state.neck.fill },
      lShoulder_to_lElbow: { points: [this.state.left_shoulder.x, this.state.left_shoulder.y, this.state.left_elbow.x, this.state.left_elbow.y], stroke: this.state.left_shoulder.fill },
      lElbow_to_lHand: { points: [this.state.left_elbow.x, this.state.left_elbow.y, this.state.left_hand.x, this.state.left_hand.y], stroke: this.state.left_elbow.fill },
      rShoulder_to_rElbow: { points: [this.state.right_shoulder.x, this.state.right_shoulder.y, this.state.right_elbow.x, this.state.right_elbow.y], stroke: this.state.right_shoulder.fill },
      rElbow_to_rHand: { points: [this.state.right_elbow.x, this.state.right_elbow.y, this.state.right_hand.x, this.state.right_hand.y], stroke: this.state.right_elbow.fill },
      neck_to_midHip: { points: [this.state.neck.x, this.state.neck.y, this.state.mid_hip.x, this.state.mid_hip.y], stroke: this.state.neck.fill },
      midHip_to_lHip: { points: [this.state.mid_hip.x, this.state.mid_hip.y, this.state.left_hip.x, this.state.left_hip.y], stroke: this.state.mid_hip.fill },
      midHip_to_rHip: { points: [this.state.mid_hip.x, this.state.mid_hip.y, this.state.right_hip.x, this.state.right_hip.y], stroke: this.state.mid_hip.fill },
      lHip_to_lKnee: { points: [this.state.left_hip.x, this.state.left_hip.y, this.state.left_knee.x, this.state.left_knee.y], stroke: this.state.left_hip.fill },
      lKnee_to_lAnkle: { points: [this.state.left_knee.x, this.state.left_knee.y, this.state.left_ankle.x, this.state.left_ankle.y], stroke: this.state.left_knee.fill },
      rHip_to_rKnee: { points: [this.state.right_hip.x, this.state.right_hip.y, this.state.right_knee.x, this.state.right_knee.y], stroke: this.state.right_hip.fill },
      rKnee_to_rAnkle: { points: [this.state.right_knee.x, this.state.right_knee.y, this.state.right_ankle.x, this.state.right_ankle.y], stroke: this.state.right_knee.fill },
    }
    this.onclick = this.onclick.bind(this);
  }

  onclick(element, previous){
    if(this.elements.includes(element)){
      this.elements = this.elements.filter(c => c!==element)
      this.setState({[element]: {onClick: previous.onClick, x: previous.x, y: previous.y, fill: '#FFFFFF', radius: 7}})
    } else {
      this.setState({[element]: {onClick: previous.onClick, x: previous.x, y: previous.y, fill: '#9D1965', radius: 13}})
      this.elements.push(element)
    }
    this.handlePoints(this.elements)
  }

  render(){

    return(
      <Stage className="body_pose_canvas" width={270} height={440}>
      <Layer>
        {Object.values(this.state).map(elem => create_Key_point(elem))}
        {Object.values(this.limbs).map(create_limb)}
      </Layer>
      </Stage>
    )
  }
}

export default Skeleton;
