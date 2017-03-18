var buttonNumber;
var numberArray = [];
var counterNumbers;
var buttonOperator;
var operatorArray = [];
var counterOperators;
var calculationObject = {};

$(document).ready(function()
{
    $("button").on("click", buttonClicked());

//end of DocReady
});

//checks for which buttons have been pressed
function buttonClicked()
{
  if(typeof(calculationObject.secondNum) === "string")
  {
    finalCheckButton();
  }
  else if(typeof(calculationObject.operator) === "string")
  {
    thirdCheckButton();
  }
  else if(typeof(calculationObject.firstNum) === "string")
  {
    secondCheckButton();
  }
  else
  {
    firstCheckButton();
  }
}

//this function ensures first button is a number
function firstCheckButton()
{
  if(this.data === 'number')
  {
    buttonNumber = this.dataNumber;
    storeNumberData = buttonNumber;
    var counterNumbers = 0;
  }
  else
  {
    errorMessage();
  }
}

function errorMessage()
{
  $("#result").text("ERROR");
}

//this function concatenates multi-digit numbers or adds operator
function secondCheckButton()
{
  switch(this.data)
  {
  case 'number':
  buttonNumber = this.dataNumber;
  storeNumberData += buttonNumber;
  break;
  case 'operator':
  counterNumbers++;
  calculationObject.firstNum = storeNumberData;
  buttonData = this.dataOperator;
  calculationObject.operator = buttonData;
  thirdCheckButton();
  break;
  case 'spec':
  buttonData = this.dataSpec;
  specialCases();
  break;
  default:
  errorMessage();
  break;
  }
}

function specialCases()
{
  if(buttonData == "clear")
  {
    $("#result").empty();
  }
  else if (buttonData == "perform")
  {
    errorMessage();
  }
}

function thirdCheckButton()
{
  switch(this.data)
  {
  case 'number':
  buttonNumber = this.dataNumber;
  storeSecondNumber += buttonNumber;
  break;
  case 'operator':
  errorMessage();
  break;
  case 'spec':
  buttonData = this.dataSpec;
  specialCases();
  break;
  default:
  errorMessage();
  break;
  }
}

function finalSpecialCases()
{
  if(buttonData == "clear")
  {
    $("#result").empty();
  }
  else if (buttonData == "perform")
  {
    calculationObject.firstNum = storeNumberData;
    sendReq();
  }
}

function finalCheckButton()
{
  switch(this.data)
  {
  case 'number':
  buttonNumber = this.dataNumber;
  storeSecondNumber += buttonNumber;
  break;
  case 'operator':
  calculationObject.secondNum = storeSecondNumber;
  buttonData = this.dataOperator;
  calculationObject.operator = buttonData;
  thirdCheckButton();
  break;
  case 'spec':
  buttonData = this.dataSpec;
  specialCases();
  break;
  default:
  errorMessage();
  break;
  }
}

function sendReq()
{
  $.ajax(
    {
    type: "POST",
    url: "/index.html",
    data: calculationObject,
    success: function(response)
      {
      updateDom(response);
      }
    });
}

function updateDom(response)
{
  $("#result").append(response);
}

//send numbers and operation to server as object
//{ x: 3, y: 4, type: Add }

//EXTRA: delay res from server to display for 3000, with "computing" until res

//
