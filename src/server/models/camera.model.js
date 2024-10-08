var bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const Camera = sequelize.define("camera", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field:'id'
    },
    name: {
      type: Sequelize.STRING(60),
      field:'name'
    },
    location: {
      type: Sequelize.STRING(60),
      field:'location'
    },
    ip_address: {
      type: Sequelize.STRING(60),
      field:'ip_address'
    }
  },{
    tableName: 'cameras_sensors',
    freezeTableName: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  });


  return Camera;
};

