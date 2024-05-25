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
    json=JSON.parse(req.body.json);
    camera_id  = json['camera_id'];
    start_time  = json['start_time'];
    time=start_time.replace(/-/g, "").replace(/:/g, "").replace(/\s/g,"");
    const name = req.file.originalname;
    const extension = path.extname(name);
    // Construct the filename based on the camera_id and the file extension
    const filename = `${camera_id}_${time}${extension}`;
    image_path=path.resolve(path.dirname(path.dirname(__dirname)),'storage',filename);
    const formData = new FormData();
    formData.append('image', fs.createReadStream(image_path)); // Create a read stream

    const response = await axios.post("http://128.199.66.84/api/model/image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set appropriate content type
      }
    });
    const output = response.data['value'];
    const ai_output = output > 70 ? 1 : 0;
    
    

    Data.create({
        data_link:filename,
        data_type:"image",
        camera_sensor_id:camera_id,
        start_time:start_time,
        ai_output:ai_output

    })
    .then(data => {
      
    })
        
    .catch(err => {
      console.log("data create error:"+err.message);
        
    });

    if(ai_output){
      const postData={
        camera_id:camera_id,
        data_link:filename,
        time:start_time

      }
    
        
    
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080', // Replace with your server address
      }); // Optional: Create an Axios instance with base URL
      
      axiosInstance.post('/api/notifications', postData, {
        headers: {
          'Content-Type': 'application/json' // Set the Content-Type header
        }
      })
      .catch(error => {
        res.status(500).send({message: error.message});
      }); 
    }
    res.status(200).send({message:"Data is posted successfully"});         
 
    
   
  } 
  catch (error) {
    return res.status(500).send({ message: error.message });
  }   
    
};







exports.update = async(req, res) => {
  const id = req.params.id;

  const updateFields = {
    name: req.body.name ? req.body.name : undefined,
    location: req.body.location ? req.body.location : undefined,
    ip_address: req.body.ip_address ? req.body.ip_address : undefined
    // Add more fields as needed
  };
  
  const updatedValues = Object.keys(updateFields).reduce((acc, key) => {
    if (updateFields[key] !== undefined) {
      acc[key] = updateFields[key];
    }
    return acc;
  }, {});


    
    Camera.update(
        updatedValues, 
        {
        where: { id: id },
        }
    )
        .then(num => {
        if (num == 1) {
            res.status(200).send({
            message: "Camera was updated successfully."
            });
        } else {
            res.status(500).send({
            message: `Cannot update Camera with id=${id}. Maybe Camera was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating camera with id=" + id
        });
        });
    
};

exports.findUser = (req, res) => {
  
  const id=req.params.id;
  Camera.findAll({
    where:{
        id:{[Op.eq]:id},
    },
    include:
      {                               
          model: User
      },
      
  })
    .then(data => {
      res.status(200).send(data[0]['users']);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};





