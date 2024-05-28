// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "12345",
//   DB: "specialized_project",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
// module.exports = {
//   HOST: "us-cluster-east-01.k8s.cleardb.net",
//   USER: "b90a58dea7840b",
//   PASSWORD: "1e39325d",
//   DB: "heroku_7fdfb091a8162d8",
//   dialect: "mysql",
//   pool: {
//     max: 20,
//     min: 0,
//     acquire: 30000,
//     idle: 3000
//   }
// };
module.exports = {
  HOST: "db-mysql-sgp1-37553-do-user-16686291-0.c.db.ondigitalocean.com",
  PORT: "25060",
  USER: "doadmin",
  PASSWORD: "AVNS_ztnIGOkqeN954jmyJV5",
  DB: "defaultdb",
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};