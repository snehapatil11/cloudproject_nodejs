var AWS = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
router.use(bodyParser.json())
require('dotenv').config();

let awsConfig = {
  "region": process.env.region,
  "accessKeyId": process.env.accessKeyId, 
  "secretAccessKey": process.env.secretAccessKey
 };
AWS.config.update(awsConfig);
var s3 = new AWS.S3();

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'cloudstoragebucket1',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'testfile'});
      },
      key: function (req, file, cb) {
        cb(null, file.originalname.toString())
      }
    })
});

const singleUpload = upload.single('file');

router.post('/fileupload', function(req, res) {

  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    return res.json({'imageUrl' : req.file.location, 'fileName': req.file.key});
  });
});

router.post('/filedelete', function(req, res){
  console.log(req.body);
  var params = {
    Bucket: 'cloudstoragebucket1',
    Key: req.body.fileName
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(data);
    }
  });
})

module.exports = router;