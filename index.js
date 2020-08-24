var express = require ('express'); 

var app = express();

var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({ region: process.env.AWS_DEFAULT_REGION });
var docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

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

var params = {
    TableName: table
};

function onScan(err, data) {
    if (err) {
        res.send("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        data.Items.forEach(function(student) {
           res.send(student)
        });
    }
}

console.log("Adding a new item...");
docClient.put(paramsInsert, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

app.listen(port, () => {
    console.log("Sever console log.")
});

app.get('/', function (req, res) {
    docClient.scan(params, onScan);
});