var express = require ('express'); 

var app = express();

var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({ region: process.env.AWS_DEFAULT_REGION });
var docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

const port = process.env.port || 5000;

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_DEFAULT_ENDPOINT,
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
  "sessionToken" : process.env.AWS_SESSION_TOKEN,
});

var params = {
    TableName: table
};

app.listen(port, () => {
    console.log("Sever console log.")
});

app.get('/', function(req, res) {
    docClient.scan(params, function(err, data) {
        if (err) {
            res.send("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data.Items)
        }
    });
});