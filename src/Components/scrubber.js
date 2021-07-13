import React from 'react';
import { Scrubber } from 'react-scrubber';
import 'react-scrubber/lib/scrubber.css'

async function extractInterestingFramesFromVideo(videoUrl, requested_frame,  fps=25) {
  return new Promise(async (resolve) => {

    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let seekResolve;
    video.addEventListener('seeked', async function() {
      if(seekResolve) seekResolve();
    });
    video.addEventListener('loadeddata', async function() {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let [w, h] = [video.videoWidth, video.videoHeight]
      canvas.width =  w;
      canvas.height = h;

      let frames = [];
      let interval = 1 / fps;
      let duration = video.duration;

      let initial;
      let final;

      if(interval*(requested_frame+200)>=duration){
        initial = Math.floor(fps*interval)-400
        final = Math.floor(fps*interval)
      } else if(requested_frame-200<0){
        initial = 0;
        final = 400
      } else {
        initial = requested_frame-200;
        final = requested_frame+200;
      }

      let currentTime = interval*initial;

      while(currentTime < interval*final) {
        video.currentTime = currentTime;
        await new Promise(r => seekResolve=r);
        context.drawImage(video, 0, 0, w, h);
        var copied = new Date().getTime();
        let base64ImageData = canvas.toDataURL('image/jpeg', 0.5);
        frames.push(base64ImageData);
        currentTime += interval;
      }
      resolve(frames);
    });

    video.src = videoObjectUrl;

  });
}
/*
async function extractBeforeFramesFromVideo(videoUrl, requested_frame,  fps=25) {
  return new Promise(async (resolve) => {

    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let seekResolve;
    video.addEventListener('seeked', async function() {
      if(seekResolve) seekResolve();
    });

    video.addEventListener('loadeddata', async function() {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let [w, h] = [video.videoWidth, video.videoHeight]
      canvas.width =  w;
      canvas.height = h;

      let frames = [];
      let interval = 1 / fps;
      let currentTime = 0;
      let duration = video.duration;

      while(currentTime < duration || currentTime > interval*(requested_frame-25)) {
        video.currentTime = currentTime;
        await new Promise(r => seekResolve=r);

        context.drawImage(video, 0, 0, w, h);
        let base64ImageData = canvas.toDataURL();
        frames.push(base64ImageData);

        currentTime += interval;
      }
      resolve(frames);
    });

    video.src = videoObjectUrl;

  });
}

async function extractAfterFramesFromVideo(videoUrl, requested_frame,  fps=25) {
  return new Promise(async (resolve) => {

    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let seekResolve;
    video.addEventListener('seeked', async function() {
      if(seekResolve) seekResolve();
    });

    video.addEventListener('loadeddata', async function() {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let [w, h] = [video.videoWidth, video.videoHeight]
      canvas.width =  w;
      canvas.height = h;

      let frames = [];
      let interval = 2 / fps;
      let currentTime = interval*(requested_frame+25);
      let duration = video.duration;

      while(currentTime < duration) {
        video.currentTime = currentTime;
        await new Promise(r => seekResolve=r);

        context.drawImage(video, 0, 0, w, h);
        let base64ImageData = canvas.toDataURL();
        frames.push(base64ImageData);

        currentTime += interval;
      }
      resolve(frames);
    });

    video.src = videoObjectUrl;

  });
}*/

class Scrubber_video extends React.Component{

  constructor(props){
    super(props);
    this.state = {selected: props.src, frame: Number(props.frame), height: Number(props.height), width: Number(props.width), duration: Number(props.duration), main_extracted: false}
    this.img = React.createRef();
    this.video = React.createRef();
    this.showFrame = this.showFrame.bind(this);
    this.scrub = React.createRef();
  }

  componentDidMount() {
    extractInterestingFramesFromVideo(this.state.selected, this.state.frame).then(res => {this.setState({main_extracted: true, main_frames: res}); this.showFrame(200)})
  }

  showFrame(number){
    this.setState({value: number})
    this.img.current.src = this.state.main_frames[Math.floor(number)]
  }

  render() {
    return(
      <>
      {!this.state.main_extracted &&
        <>
        <div className="waiting_box_empty"/>
          <div class="loader">
            <div class="item item-1"></div>
            <div class="item item-2"></div>
            <div class="item item-3"></div>
            <div class="item item-4"></div>
          </div>
        </>
      }
      {this.state.main_extracted &&
        <>
        <div className='scrubber_container'>
          <img className="frames_scrubber" ref={this.img}/>
        </div>
        <div  className="scrubber-container"  style={{ height:  '10px' }}>
        <Scrubber
          ref={this.scrub}
          min={0}
          max={400}
          value={this.state.value}
          onScrubChange={this.showFrame}
        />
      </div>
      </>
      }
      </>
    )
  }
}

export default Scrubber_video;
