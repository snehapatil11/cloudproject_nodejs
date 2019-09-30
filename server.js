const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const AWS = require('aws-sdk');
app.use(cors());


AWS.config.update(awsConfig);

const dynamoDb = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.json({ type: 'application/json' }));

app.listen(4001, () => {
    console.log("Server running on port 4001");
})


app.get('/', function (req, res) {

  res.send('Hello World!')

})

app.get('/users', function (req, res) {
    const params = {  
      TableName: "users"
    }    
    dynamoDb.scan(params, (error, result) => {
  
      if (error) {  
        console.log(error);  
        return res.status(400).json({ error: 'Could not get user' });  
      }
  
      if (result) { return res.json({result}); } 
      else { return res.status(404).json({ error: "User not found" }); }  
    });
  
  })

  app.post('/postusers', function(req, res){
    const params = {  
      TableName: "users",
      Item: {
        "email":"abcdde1@gmail.com",
        "name":"sneha1"
      }
    }
    dynamoDb.put(params, (error, result) =>{
      
      if(error){
        console.log(error);
        console.log(params);
        return res.status(400).json({ error: 'Could not insert user' });
      }
      if(result){
        return res.json({result});
      }
      else
      return res.status(400).json({ error: 'Could not insert user1' });  
    })

  })

