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
    console.log("ThingA");
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
  console.log("ThingB");
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
  console.log("ThingC");
}

function errorMessage()
{
  $("#result").text("ERROR");
  clearInfo();
  console.log("ThingD");
}

//this clears arrays of info as well as counters
function clearInfo()
{
  numberArray = [];
  operatorArray = [];
  counterNumbers = 0;
  counterOperators = 0;
  console.log("ThingE");
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
  console.log("ThingF"); //This isn't working
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
  console.log("ThingG"); //This isn't working
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
  console.log("ThingH"); //This isn't working
}

function nextNum()
{
  buttonNumber = this.dataNumber;
  storeNumberData += buttonNumber;
  canSend = true;
  console.log("ThingI"); //This isn't working
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
  console.log("ThingJ"); //This isn't working
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
  console.log("ThingK"); //This isn't working
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
  console.log("ThingL"); //This isn't working
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
  console.log("ThingM"); //This isn't working
}

function sendReq()
{
  calculationObject.numbers = numberArray;
  calculationObject.operators = operatorArray;

  $.ajax(
    {
    type: "POST",
    url: "/calculate",
    data: calculationObject,
    success: function(response)
      {
      updateDom(response);
      }
    });
    console.log("ThingN"); //This isn't working
}

function updateDom(response)
{
  $("#result").append(response);
  console.log("ThingO"); //This isn't working
}

//EXTRA: delay res from server to display for 3000, with "computing" until res
