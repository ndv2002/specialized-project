// const User = require("../models/user.model.js");
const db = require("../models");
const Camera = db.camera;
const Op = db.Sequelize.Op;

checkDuplicateIPAddress = (req, res, next) => {
    // Username
    Camera.findOne({
      where: {
        ip_address: req.body.ip_address
      }
    }).then(camera => {
      if (camera) {
        res.status(400).send({
          message: "Failed! IP address is already in use!"
        });
        return;
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

    const checkDuplicate = await Camera.findOne({ 
        where: {
            ip_address: {
                [Op.eq]: req.body.ip_address
            }
        } });
    
    if (checkDuplicate) {
        res.status(500).send({ error: "This IP address is already in use." });
    }

    else{
    Camera.create(camera)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the camera."
        });
        });
    }
};

exports.findAll = (req, res) => {
  
  let where = {};

  if(req.query.ip_address) {
    where['ip_address'] = {[Op.eq]: req.query.ip_address};
  }
  Camera.findAll(
    {where}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cameras."
      });
    });
};





exports.update = async(req, res) => {
  const ip_address = req.params.ip_address;

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


    const checkDuplicate = await Camera.findOne({ 
        where: {
            ip_address: {
                [Op.eq]: req.body.ip_address
            }
        } });

    if (checkDuplicate) {
        res.status(500).send({ error: "This IP address is already in use." });
    }
    else{
        Camera.update(
            updatedValues, 
            {
            where: { ip_address: ip_address },
            }
        )
            .then(num => {
            if (num == 1) {
                res.send({
                message: "Camera was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update Camera with ip_address=${ip_address}. Maybe Camera was not found or req.body is empty!`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: "Error updating camera with ip_address=" + ip_address
            });
            });
    }    
};

exports.delete = (req, res) => {
  const Username = req.params.username;

  User.destroy({
    where: { Username:Username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with username=${Username}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with username=" + Username
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};



