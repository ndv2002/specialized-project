var bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define("data", {
    data_link: {
      type: Sequelize.STRING,
      primaryKey:true,
      field:'data_link'
    },
    data_type: {
      type: Sequelize.STRING(30),
      field:'data_type'
    },
    camera_id: {
      type: Sequelize.INTEGER,
      field:'camera_sensor_id'
    },
    start_time: {
      type: Sequelize.DATE,
      field:'start_time'
    },
    end_time: {
      type: Sequelize.DATE,
      field:'end_time'
    },
    ai_output:{
        type:Sequelize.BOOLEAN,
        field:'ai_output'
    }
  },{
    tableName: 'datas',
    freezeTableName: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  });

  
  return Data;
};
