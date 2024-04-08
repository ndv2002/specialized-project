// const User = require("../models/user.model.js");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a User
//   const user = new User({
//     Name:req.body.Name,
//     Username:req.body.Username,
//     Password:req.body.Password,
//     Role:req.body.Role
//   });

//   // Save User in the database
//   User.create(user, (err, data) => {
//     console.log(user);
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     else res.send(data);
//   });    
// };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single user with a username
exports.findOne = (req, res) => {
  const Username = req.params.username;

  User.findByPk(Username)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with username=${Username}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with username=" + Username
      });
    });
};


// Update a User identified by the username in the request
exports.update = (req, res) => {
  
  const Username = req.params.username;
  // const updates = {};

  // // Iterate over req.body keys and assign non-null and non-undefined values to the updates object
  // for (const key in req.body) {
  //   if (req.body[key] !== null && req.body[key] !== undefined) {
  //     updates[key] = req.body[key];
  //   }
  // }
try{
  if (req.body.Password !== undefined) {
    // Hash the password using bcryptjs
    req.body.Password =  bcrypt.hashSync(req.body.Password, 8);
    
    
  }}
  catch({ name, message }){
    console.log(name); // "TypeError"
    console.log(message); // "oops"
  };
  
  User.update(req.body, {
    where: { Username: Username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${Username}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with username=" + Username
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  User.removebyUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with username " + req.params.username
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });  
};

exports.create = (req, res) => {
  

  // Create a User
  const user = {
    Name: req.body.Name,
    Username: req.body.Username,
    Password: req.body.Password,
    Role:req.body.Role
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const Username = req.params.username;
  console.log("Username: "+Username);

  User.findAll({
    where: {
      Username: {
        [Op.eq]: Username
      }
    }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with username=${Username}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with username=" + Username
      });
    });
};

exports.update = (req, res) => {
  const Username = req.params.username;

  User.update(req.body, {
    where: { Username: Username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${Username}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with username=" + Username
      });
    });
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

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

