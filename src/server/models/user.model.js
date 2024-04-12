var bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING(255),
      field:'first_name'
    },
    last_name: {
      type: Sequelize.STRING(255),
      field:'last_name'
    },
    username: {
      type: Sequelize.STRING(255),
      primaryKey: true,
      field:'username'
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field:'password'
    }
  },{
    tableName: 'users',
    freezeTableName: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  });

  User.addHook(
    "beforeUpdate",
    user => (user.password = bcrypt.hashSync(user.Password, 8))
  );

  return User;
};

// const sql = require("./db.js");

// // constructor
// const User = function(user) {
//   this.Name=user.Name;
//   this.Username=user.Username;
//   this.Password=user.Password;
//   this.Role=user.Role;
// };

// User.create = (newUser, result) => {
//   console.log(newUser);
//   sql.query("INSERT INTO user (Name, Username, Password, Role) VALUES ('" + newUser.Name + "', '" + newUser.Username + "', '" + newUser.Password + "', '" + newUser.Role + "')", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created user: ", { id: res.insertId, ...newUser });
//     result(null, { id: res.insertId, ...newUser });
//   });
// };

// User.findByUsername = (username, result) => {
//   sql.query(`SELECT * FROM user WHERE Username = '${username}'`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found user: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// User.getAll = (title, result) => {
//   let query = "SELECT * FROM user";

//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("users: ", res);
//     result(null, res);
//   });
// };



// User.updateById = (id, user, result) => {
//   let query = ``;
//   // if(user.Name !== undefined){
//   //     query += `Name = '${user.Name}',`
//   // }
//   // if(user.Username !== undefined){
//   //   query += `Username = '${user.Username}',`
//   // }
//   // if(user.Password !== undefined){
//   //   query += `Password = '${user.Password}',`
//   // }
//   // if(user.Role !== undefined){
//   //   query += `Role = '${user.Role}',`
//   // }
//   for (const key in user) {
//     if (user[key] !== undefined) {
//       // Add column name and value to arrays
//       query += `${key} = '${user[key]}',`
//     }
//   }
//   query=query.substring(0,query.length - 1);

//   // Construct the SQL query dynamically
//   let sqlQuery = `UPDATE user SET ${query} WHERE ID = ${id}`;
  
//   sql.query(
//     sqlQuery,
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found User with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("Updated user: ", { id: id, ...user });
//       result(null, { id: id, ...user });
//     }
//   );
// };

// User.removebyUsername = (username, result) => {
//   sql.query(`DELETE FROM user WHERE Username = '${username}'`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found User with the username
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted user with username: ", username);
//     result(null, res);
//   });
// };

// User.removeAll = result => {
//   sql.query("DELETE FROM user", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} users`);
//     result(null, res);
//   });
// };

// module.exports = User;