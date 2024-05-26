// const User = require("../models/user.model.js");
const db = require("../models");
const Camera = db.camera;
const User = db.user;
const Data=db.data;
const Op = db.Sequelize.Op;
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path')

exports.create = async(req, res) => {
  let filename;
  let start_time;
  let camera_id;
  let ai_output;
  let output;
  try {
    // Check if the request contains a JSON body and a file
  //   if (!req.file) {
  //     return res.status(400).send({ message: 'Missing file in the request' });
  //   }
  //   if (!req.body.json) {
  //     return res.status(400).send({ message: 'Missing json in the request' });
  //   }
  //   json=JSON.parse(req.body.json);

  //   const  camera_id  = json['camera_id'];
  //   if(camera_id == null || camera_id === undefined){
  //     return res.status(400).send({ message: 'Missing camera_id in the request body' });
  //   }
  //   const start_time  = json['start_time'];
  //   if(start_time == null || start_time === undefined){
  //     return res.status(400).send({ message: 'Missing start_time in the request body' });
  //   }

  //   const name = req.file.originalname;

  // // Extract extension
  //   const extension = path.extname(name);
  //   // Construct the filename based on the camera_id and the file extension
  //   const filename = `${camera_id}_${start_time}${extension}`;
  //   const sourcePath=path.join(path.dirname(path.dirname(path.dirname(__dirname))), req.file.path);
  //   const destinationPath = path.join(path.dirname(path.dirname(__dirname)), 'storage',filename); // Replace with your desired folder
  //   console.log("name:"+name);
  //   console.log("old path:"+sourcePath);
  //   console.log("new path: "+ destinationPath);
  // // Move the uploaded file to the destination folder

  // fs.renameSync(sourcePath, destinationPath, (err) => {
  //   if (err) {;
  //     return res.status(500).json({ message: err.message });
  //   }};
    let json=JSON.parse(req.body.json);
    camera_id  = json['camera_id'];
    start_time  = json['start_time'];
    let time=start_time.replace(/-/g, "").replace(/:/g, "").replace(/\s/g,"");
    const name = req.file.originalname;
    const extension = path.extname(name);
    // Construct the filename based on the camera_id and the file extension
    filename = `${camera_id}_${time}${extension}`;
    image_path=path.resolve(path.dirname(path.dirname(__dirname)),'storage',filename);
    const formData = new FormData();
    formData.append('image', fs.createReadStream(image_path)); // Create a read stream

    const response = await axios.post("http://128.199.66.84/api/model/image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set appropriate content type
      }
    });
    output = response.data['value'];
    ai_output = output > 70 ? 1 : 0;

  } 
  catch (error) {
    return res.status(500).send({ message: error.message });
  }   


  
  Data.create({
    data_link:filename,
    data_type:"image",
    camera_sensor_id:camera_id,
    start_time:start_time,
    ai_output:ai_output,
    probability: output

  })
  .then(data => {
    
  })   
  .catch(err => {
    console.log("error: "+err.message);
      
  });

  if(ai_output){
    const postData={
      camera_id:camera_id,
      data_link:filename,
      time:start_time

    }

      

    const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8080', // Replace with your server address
    }); // Optional: Create an Axios instance with base URL
    
    axiosInstance.post('/api/notifications', postData, {
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      }
    })
    .catch(error => {
      console.log("error: "+error.message);
    }); 
  }
  res.status(200).send({message:"Data is posted successfully"});
    
};



exports.getFile = async(req, res) => {
  try {
    const filename = req.params.filename;
    if (!filename) {
      return res.status(400).json({ message: 'Missing filename in request params' });
    }

    const filePath = path.resolve(path.dirname(path.dirname(__dirname)),'storage', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).sendFile(filePath);

  }
  catch (error) {
    res.status(500).json({ message: err.message });
  }

};



