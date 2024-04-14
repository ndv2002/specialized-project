const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.camera = require("../models/camera.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "users_roles",
  foreignKey: "role",
  otherKey: "username"
});
db.user.belongsToMany(db.role, {
  through: "users_roles",
  foreignKey: "username",
  otherKey: "role"
});

db.camera.belongsToMany(db.user, {
  through: "users_cameras",
  foreignKey: "camera_sensor_ip",
  otherKey: "username"
});
db.user.belongsToMany(db.camera, {
  through: "users_cameras",
  foreignKey: "username",
  otherKey: "camera_sensor_ip"
});


db.ROLES = ["User", "Admin"];

module.exports = db;