const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors(corsOptions));
app.use(cors());




app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const db = require("./models");
const Role = db.role;
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Fire Detection application." });
});

require("./routes/user.routes.js")(app);
require('./routes/auth.routes.js')(app);
require('./routes/camera.routes.js')(app);
require('./routes/notification.routes.js')(app);
require('./routes/data.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});