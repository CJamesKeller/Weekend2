var express = require("express");
var app = express();
var path = require("path");
var port = 5000;

var numberArray = [];
var operatorArray = [];
var calculatingArray = [];
var output;

// set default path
app.use(express.static('server/public'));

// base URL 'GET'
app.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

//recieves post request and sends confirmation
app.post("/calculate" , function(req, res)
{
  var calculationObject = req;
  numberArray = calculationObject.numbers;
  operatorArray = calculationObject.operators;
  calculateResult();
  res.sendStatus(200);
  res.send(output);
});

//creates single array of alternating numbers and operators
function calculateResult()
{
  for(var i = 0; i < numberArray.length; i++)
  {
    numberArray[i].push(calculatingArray);
    if(operatorArray[i] !== undefined)
    {
      operatorArray[i].push(calculatingArray);
    }
  }
  arrayToCalc();
}

//actually evaluates the whole input
function arrayToCalc()
{
  var numString = calculatingArray.toString();
  numString.replace(",", "");
  output = eval(numString);
}

//this just shows it's working
app.listen(port, function()
{
  console.log("Listening on port! : ", port);
});
