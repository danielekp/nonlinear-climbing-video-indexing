import React from 'react';
import{Stage, Layer, Circle, Line} from 'react-konva';
import API from '../get_api';

const scale = 5.9

function create_Key_point(e){
  return <Circle {...e}/>
}

function create_limb(e){
  return <Line {...e}/>
}

class MyCanvas extends React.Component{

  constructor(props){
    super (props);
    this.state={
        nose: {onDragMove: (drag => this.on_drag(drag, this.state.nose)),draggable: true, x: 746/scale, y: 364/scale, fill: '#791668', radius: 4},
        neck: {onDragMove: (drag => this.on_drag(drag, this.state.neck)),draggable: true, x: 749/scale, y: 648/scale, fill: '#753980', radius: 4},
        left_shoulder: {onDragMove: (drag => this.on_drag(drag, this.state.left_shoulder)),draggable: true, x: 540/scale, y: 648/scale, fill: '#9D1965', radius: 5},
        left_elbow: {onDragMove: (drag => this.on_drag(drag, this.state.left_elbow)),draggable: true, x: 429/scale, y: 950/scale, fill:'blue', radius: 4},
        left_hand: {onDragMove: (drag => this.on_drag(drag, this.state.left_hand)),draggable: true, x: 311/scale, y: 1206/scale, fill: 'red', radius: 5},
        right_shoulder: {onDragMove: (drag => this.on_drag(drag, this.state.right_shoulder)),draggable: true, x: 956/scale, y: 647/scale, fill: '#19989D', radius: 5},
        right_elbow: {onDragMove: (drag => this.on_drag(drag, this.state.right_elbow)),draggable: true,x: 1037/scale, y: 945/scale, fill:'#96B8BA', radius: 4},
        right_hand: {onDragMove: (drag => this.on_drag(drag, this.state.right_hand)),draggable: true, x: 1095/scale, y: 1256/scale, fill: '#906333', radius: 5},
        mid_hip: {onDragMove: (drag => this.on_drag(drag, this.state.mid_hip)),draggable: true,x: 738/scale, y: 1251/scale, fill: '#EA6A4E', radius: 4},
        left_hip: {onDragMove: (drag => this.on_drag(drag, this.state.left_hip)),draggable: true,x: 600/scale, y: 1234/scale, fill: '#6EDABA', radius: 4},
        left_knee: {onDragMove: (drag => this.on_drag(drag, this.state.left_knee)),draggable: true, x: 585/scale, y: 1684/scale, fill: '#15342B', radius: 5},
        left_ankle: {onDragMove: (drag => this.on_drag(drag, this.state.left_ankle)),draggable: true,x: 542/scale, y: 2136/scale, fill: '#74B0D7', radius: 5},
        right_hip: {onDragMove: (drag => this.on_drag(drag, this.state.right_hip)),draggable: true,x: 867/scale, y: 1258/scale, fill: '#2E7617', radius: 4},
        right_knee: {onDragMove: (drag => this.on_drag(drag, this.state.right_knee)),draggable: true, x: 873/scale, y: 1702/scale, fill: '#15342B', radius: 5},
        right_ankle: {onDragMove: (drag => this.on_drag(drag, this.state.right_ankle)),draggable: true, x: 884/scale, y: 2142/scale, fill: '#74B007', radius: 5},
    }
    this.on_drag = this.on_drag.bind(this);
    this.submit = this.submit.bind(this);
  }

  on_drag(drag, previous){
    this.setState({temporal: Object.assign(previous,{x: drag.target.attrs.x, y: drag.target.attrs.y})}) //new point position copied in a temporal variable
  }

  submit(){
    let clone = Object.assign({},this.state)
    delete clone.temporal
    //console.log(clone)
    let data = Object.entries(clone).map(r => [r[1].x,r[1].y])
    console.log(data)
    API.getImage(data).then(c => console.log(c))
  }

  render(){
    let limbs = {
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
    return(<>
      <Stage className="body_pose_canvas" width={270} height={440}>
      <Layer>
        {Object.values(this.state).map(elem => create_Key_point(elem))}
        {Object.values(limbs).map(create_limb)}
      </Layer>
    </Stage>
    <div className="button" onClick={this.submit}>Send data</div>
    </>
    )
  }
}

export default MyCanvas;
