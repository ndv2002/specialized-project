var bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const Camera = sequelize.define("cameras_sensors", {
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
      primaryKey: true,
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

