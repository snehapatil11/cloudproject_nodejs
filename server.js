// var AWS = require('aws-sdk')
// var express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const fileRoutes = require("./Routes/fileupload")
// const awsConfigJson = require("./Config/awsdynamodbconfig")
// require('dotenv').config();
// var app = express();

// let awsConfig = {
//   "region": process.env.region,
//  "endpoint": process.env.endpoint,
//  "accessKeyId": process.env.accessKeyId, 
//  "secretAccessKey": process.env.secretAccessKey
// };

// app.use(cors());
// app.use("/api", fileRoutes);


// AWS.config.update(awsConfig);
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
// var s3 = new AWS.S3();

// app.use(bodyParser.json({ type: 'application/json' }));

// app.listen(4001, () => {
//     console.log("Server running on port 4001");
// })
// app.get('/', function (req, res) {

//   res.send('Hello World!')

// })

// app.get('/users', function (req, res) {
//     const params = {  
//       TableName: "storageFiles"
//     }    
//     dynamoDb.scan(params, (error, result) => {
  
//       if (error) {  
//         console.log(error);  
//         return res.status(400).json({ error: 'Could not get user' });  
//       }
  
//       if (result) { 
//         //console.log(result.Items);
//         return res.json(result.Items);
//       } 
//       else { return res.status(404).json({ error: "User not found" }); }  
//     });
  
// })

// app.post('/postusers', function(req, res){
//     const params = {  
//       TableName: "storageFiles",
//       Item: req.body
//     }
//     console.log(params);
//     dynamoDb.put(params, (error, result) =>{
      
//       if(error){
//         console.log(error);
//         console.log(params);
//         return res.status(400).json({ error: 'Could not insert user' });
//       }
//       if(result){
//         console.log(result);
//         return res.json({result});
//       }
//       else
//       return res.status(400).json({ error: 'Could not insert user1' });  
//     })

// })

// app.delete('/deletefiledata/:fileId',function(req, res){
//   const params = {  
//     TableName: "storageFiles",
//     Key: 
//     {
//       "Id": req.params.fileId      
//     }
//   }
//   console.log(params);
//   dynamoDb.delete(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         res.json(data);
//     }
//   });
// })
