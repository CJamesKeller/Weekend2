var express = require("express");
var app = express();
var path = require("path");
var port = 5000;
//apparently needed this
var bodyParser = require('body-parser');

//vars for my functions
var numberArray = [];
var operatorArray = [];
var calculatingArray = [];
var output;
var finalOutput;

// set default path
app.use(express.static('server/public'));
//apparently needed this
app.use(bodyParser.urlencoded({extended: true}));

// base URL 'GET'
app.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
  console.log("Initial GET worked!");
});

//recieves post request and sends confirmation
app.post("/calculate" , function(req, res)
{
  console.log("POST starting!");
  var calculationObject = req.body;
  numberArray = calculationObject.numbers;
  operatorArray = calculationObject.operators;
  calculateResult(res);
  //res.send();
  res.send({finalOutput: finalOutput});
});


//creates single array of alternating numbers and operators
function calculateResult()
{
  for(var i = 0; i < numberArray.length; i++)
  {
    calculatingArray.push(numberArray[i]);
    if(operatorArray[i] !== undefined)
    {
      calculatingArray.push(operatorArray[i]);
    }
  }
  arrayToCalc();
  console.log("POST ran!");
}

//actually evaluates the whole input
function arrayToCalc(res)
{
  var numString = calculatingArray.toString();
  numString = numString.replace(/,/g, " ");
  numString = numString.replace(/add/g, "+");
  numString = numString.replace(/subtract/g, "-");
  numString = numString.replace(/multiply/g, "*");
  numString = numString.replace(/divide/g, "/");
  console.log(numString);
  output = eval(numString);
  finalOutput = output.toString();
  console.log("Calculated answer!");
}

//this just shows it's set up
app.listen(port, function()
{
  console.log("Listening on port: ", port);
});
