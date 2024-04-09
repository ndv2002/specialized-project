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
module.exports = {
  HOST: "us-cluster-east-01.k8s.cleardb.net",
  USER: "bb640c66535559",
  PASSWORD: "7fe53b76",
  DB: "heroku_fa775146554d665",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};