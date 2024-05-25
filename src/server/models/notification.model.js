module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notification", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field:'id'
    },
    data_link: {
      type: Sequelize.STRING,
      field:'data_link'
    },
    username: {
      type: Sequelize.STRING,
      field:'username'
    },
    time: {
      type: Sequelize.DATE,
      field:'time'
    },
    content: {
        type: Sequelize.TEXT,
        field:'content'
      }
  },{
    tableName: 'notifications',
    freezeTableName: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  });


  return Notification;
};

