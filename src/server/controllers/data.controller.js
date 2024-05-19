// const User = require("../models/user.model.js");
const db = require("../models");
const Camera = db.camera;
const User = db.user;
const Op = db.Sequelize.Op;
const {PythonShell} = require('python-shell');
const spawn=require('child_process').spawn;
exports.create = async(req, res) => {
  
   
    
};

exports.findAll = (req, res) => {   

    // PythonShell.run('./src/server/AI/image_test.py', null).then(messages=>{
    //     console.log('finished');
    //   });

    

      // E.g : http://localhost:3000/name?firstname=van&lastname=nghia
      var process = spawn('python', [
        './src/server/AI/image_test.py',
        'abc'
      ]);
      process.stdout.on('data', function(data) {
        console.log("stdout: "+data.toString());
    
        // res.send(data.toString());
      });  
      // const result = process.stdout?.toString()?.trim();
      // console.log(result);   
      process.stderr.on('data', function(data) {
        console.log("stderr: "+data.toString());
    
        // res.send(data.toString());
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



