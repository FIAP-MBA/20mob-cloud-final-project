var express = require ('express'); 

var app = express();

var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "students";

var rm = "RM336648";

const port = process.env.port || 5000;

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_DEFAULT_ENDPOINT,
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
  "sessionToken" : process.env.AWS_SESSION_TOKEN,
});

var paramsInsert = {
    TableName:table,
    Item:{
        "RM": "RM123456",
        "age": "26",
        "name": "Cidão",
        "email": "teste@teste.com"
    }
};

console.log("Adding a new item...");
docClient.put(paramsInsert, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});

var params = {
    TableName: table,
    Key:{
        "RM": rm
    }
};

app.listen(port, () => {
    console.log("Sever console log.")
});

app.get('/', function (req, res) {
    res.send("Gostou")
});