module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      name: {
        type: Sequelize.STRING(255),
        primaryKey:true,
        field:'name'
      }
    },{
      tableName: 'roles',
      freezeTableName: true,
      // If don't want createdAt
      createdAt: false,

      // If don't want updatedAt
      updatedAt: false
    });
      
    return Role;
  };