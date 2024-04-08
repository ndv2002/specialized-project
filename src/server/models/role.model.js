module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      Name: {
        type: Sequelize.STRING(255),
        primaryKey:true,
        field:'Name'
      }
    },{
      tableName: 'role',
      freezeTableName: true,
      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false
    });
      
    return Role;
  };