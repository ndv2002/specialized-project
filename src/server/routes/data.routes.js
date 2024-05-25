const controller = require("../controllers/data.controller");
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  
  destination: (req, file, cb, res) => {
    cb(null, path.resolve(path.dirname(path.dirname(__dirname)),'storage'));
  },
  filename: function (req, file, callback) {
    if (!file) {
      return callback(new Error('Missing file in the request'), null);
    }
    if (!req.body.json) {
      return callback(new Error('Missing json in the request'), null);
    }
    json=JSON.parse(req.body.json);

    camera_id  = json['camera_id'];
    if(camera_id == null || camera_id === undefined){
      return callback(new Error('Missing camera_id in the json'), null);
    }
    start_time  = json['start_time'];
    if(start_time == null || start_time === undefined){
      return callback(new Error('Missing start_time in the json'), null);
    }
    start_time=start_time.replace(/-/g, "").replace(/:/g, "").replace(/\s/g,"");
    const name = file.originalname;

  // Extract extension
    const extension = path.extname(name);
    // Construct the filename based on the camera_id and the file extension
    const filename = `${camera_id}_${start_time}${extension}`;
    callback(null, filename);
  }
});
const upload = multer({storage});
// { dest: 'src/storage/' }

module.exports = function(app) {


  var router = express();
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  
  // Post data to storage
  router.post("/", upload.single('image') , controller.create);

  // Get image from name
  router.get("/:filename",  controller.getFile);


  app.use('/api/datas', router);


};