var AWS = require('aws-sdk');
var express = require("express");
var router = express.Router();
const awsConfigJson = require("./Config/awsdynamodbconfig")
var app = express();

let awsConfig = {
  "region": process.env.region,
 "endpoint": process.env.endpoint,
 "accessKeyId": process.env.accessKeyId, 
 "secretAccessKey": process.env.secretAccessKey
};

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB();

app.get("/read",(req, res, next)=>{
    const params = {
        TableName: "storageFiles"
    };    
    
    docClient.scan(params, function(err, data) {
        if (err) {
          res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else {
          res.send("hello world");
        }
      });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});