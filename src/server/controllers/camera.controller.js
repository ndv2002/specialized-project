// const User = require("../models/user.model.js");
const db = require("../models");
const Camera = db.camera;
const User = db.user;
const Notification  = db.notification;
const Data = db.data;
const Op = db.Sequelize.Op;

checkDuplicateIPAddress = (req, res, next) => {
    // Username
    Camera.findOne({
      where: {
        ip_address: req.body.ip_address
      }
    }).then(camera => {
      if (camera) {
        return res.status(400).send({
          message: "Failed! IP address is already in use!"
        });
        
      }
      next();
      
    });
  };

exports.create = async(req, res) => {
  
    
    const camera = {
        name: req.body.name,
        location: req.body.location,
        ip_address: req.body.ip_address
        
    };

    // const checkDuplicate = await Camera.findOne({ 
    //     where: {
    //         ip_address: {
    //             [Op.eq]: req.body.ip_address
    //         }
    //     } });
    
    // if (checkDuplicate) {
    //     res.status(500).send({ error: "This IP address is already in use." });
    // }

 
    Camera.create(camera)
    .then(data => {
    return res.status(200).send({message: `New camera with ip_address=${req.body.ip_address} was added successfully.`});
    })
    .catch(err => {
    return res.status(500).send({
        message:
        err.message || "Some error occurred while creating the camera."
    });
    });
    
};

exports.findAll = (req, res) => {
  
    let where = {};

    if(req.query.ip_address) {
      where['ip_address'] = {[Op.eq]: req.query.ip_address};
    }

    if(req.query.name) {
      where['name'] = {[Op.like]:'%' + req.query.name + '%' };
    }

    if(req.query.location) {
      where['location'] = {[Op.like]:'%' +  req.query.location + '%'};
    }

    Camera.findAll(
      {where}
    )
    .then(data => {
      return res.status(200).send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message 
      });
    });
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
            return res.status(200).send({
            message: "Camera was updated successfully."
            });
        } else {
            return res.status(500).send({
            message: `Cannot update Camera with id=${id}. Maybe Camera was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        return res.status(500).send({
            message: "Error updating camera with id=" + id
        });
        });
    
};

exports.findUsers = (req, res) => {
  
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
      return res.status(200).send(data[0]['users']);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findNotifications = (req, res) => {
  
  const camera_id=req.params.id;
  Camera.findByPk(camera_id)
  .then((camera)=> {
      if (!camera) {
        return res.status(500).send({message: "Camera with id = " + camera_id + " not found."});
      }
   
  })
  .catch(err => {
    return res.status(500).send({
      message:
        err.message 
    });
  });

  Data.findAll({
    where:{
        camera_sensor_id:camera_id
    },
    include:
      {                               
          model: Notification
      },
      
  })
  .then((data) => {
    jsonData = JSON.stringify(data);
    jsonData = JSON.parse(jsonData);
    result=[];
    jsonData.forEach(element => {
      if (element.hasOwnProperty("notifications")) {
        result = result.concat(element['notifications']); // Concatenate the key
      }
    });
    return res.status(200).send(result);
  })
  .catch(err => {
    return res.status(500).send({
      message:
        err.message 
    });
  });

  
};


exports.findDatas = (req, res) => {
  
  const camera_id=req.params.id;
  Camera.findByPk(camera_id)
  .then((camera)=> {
      if (!camera) {
        return res.status(500).send({message: "Camera with id = " + camera_id + " not found."});
      }
      
  })
  .catch(err => {
    return res.status(500).send({
      message:
        err.message 
    });
  });

  Data.findAll({
    where:{
        camera_sensor_id:camera_id
    }
      
  })
  .then((data) => {
    
    return res.status(200).send(data);
  })
  .catch(err => {
    return res.status(500).send({
      message:
        err.message 
    });
  });  

  
};

// exports.delete = (req, res) => {
//   const Username = req.params.username;

//   User.destroy({
//     where: { Username:Username }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with username=${Username}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with username=" + Username
//       });
//     });
// };

// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     });
// };



