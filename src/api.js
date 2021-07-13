import blob from 'blob';

async function getImage(points){
  let url = '/getimage'
  return new Promise((resolve, reject) => {
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(points)
    }).then(res => {
      if(res.ok){
        res.json().then(image => resolve(image))
      } else {
        res.json().then(obj => reject(obj))
      }
    })
  })
}

async function getVideos(x_origin, y_origin, x_target, y_target, image_name, body_parts){
  console.log(x_origin, y_origin, x_target, y_target, image_name, body_parts)
  let url = '/getvideos'
  return new Promise((resolve, reject) => {
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({x_origin: x_origin, y_origin: y_origin, x_target: x_target, y_target: y_target, image: image_name, joints: body_parts})
    }).then(res => {
      if(res.ok){
        res.json().then(list => resolve(JSON.parse(list)))
      } else {
        res.json().then(obj => reject(obj))
      }
    })
  })
}

const API = {getVideos}

export default API
