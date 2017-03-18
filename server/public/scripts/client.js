var buttonNumber;
var numberArray = [];
var counterNumbers = 0;
var buttonOperator;
var operatorArray = [];
var counterOperators = 0;
var calculationObject = {};
var canSend = false;

$(document).ready(function()
{
    $("button").on("click", buttonClicked());

//end of DocReady
});

//checks for which buttons have been pressed in what order
function buttonClicked()
{
  if(counterOperators === 1)
  {
    nextCheckButton();
  }
  else if(counterNumbers === 1)
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
    counterNumbers = 1;
  }
  else
  {
    errorMessage();
  }
}

function errorMessage()
{
  $("#result").text("ERROR");
  clearInfo();
}

//this clears arrays of info as well as counters
function clearInfo()
{
  numberArray = [];
  operatorArray = [];
  counterNumbers = 0;
  counterOperators = 0;
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
  numberArray[counterNumbers] = storeNumberData;
  counterNumbers++;
  buttonData = this.dataOperator;
  operatorArray[counterOperators] = buttonData;
  counterOperators++;
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
    clearInfo();
  }
  else if (buttonData == "perform")
  {
    errorMessage();
  }
}

//this ensures another number comes after operator
function nextCheckButton()
{
  if(this.data == "number")
  {
    nextNum();
  }
  else
  {
    nextNonNum();
  }
}

function nextNum()
{
  buttonNumber = this.dataNumber;
  storeNumberData += buttonNumber;
  canSend = true;
}

function nextNonNum()
{
  switch(this.data)
  {
  case 'operator':
  operatorSplit();
  break;
  case 'spec':
  buttonData = this.dataSpec;
  finalSpecialCases();
  break;
  default:
  errorMessage();
  break;
  }
}

//this prevents an attempt to calculate on N,O,N,O,etc- type inputs ("nono's!")
function operatorSplit()
{
  if(canSend)
  {
    canSend = false;
  }
  else
  {
    errorMessage();
  }
}

function finalSpecialCases()
{
  if(buttonData == "clear")
  {
    $("#result").empty();
    clearInfo();
  }
  else if (buttonData == "perform")
  {
    checkToSend();
  }
}

function checkToSend()
{
  if(canSend)
  {
    sendReq();
  }
  else
  {
    errorMessage();
  }
}

function sendReq()
{
  calculationObject.numbers = numberArray;
  calculationObject.operators = operatorArray;

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
