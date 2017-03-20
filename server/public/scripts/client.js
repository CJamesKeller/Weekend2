var thisButton;
var thisButtonData;
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
  //The next three lines are just to test the server-client communications
  // numberArray = [1,2,3,4];
  // operatorArray = ["add", "subtract", "multiply"];
  // sendReq();

  //This is what would actually be in the DocReady:
    $(".container").on("click", "button", function()
    {
      thisButton = $(this);
      console.log(thisButton);
      buttonClicked(thisButtonData);
      console.log("Click Listener!");
    });
//end of DocReady
});

//checks for which buttons have been pressed in what order
function buttonClicked(thisButtonData)
{
  if(counterOperators === 1)
  {
    nextCheckButton(thisButtonData);
  }
  else if(counterNumbers === 1)
  {
    secondCheckButton(thisButtonData);
  }
  else
  {
    firstCheckButton(thisButtonData);
  }
  console.log("Click Sorted!");
}

//this function ensures first button is a number
function firstCheckButton(thisButtonData)
{
  if(thisButtonData === 'number')
  {
    buttonNumber = thisButtonData;
    storeNumberData = buttonNumber;
    counterNumbers = 1;
  }
  else
  {
    errorMessage();
  }
  console.log("First Check!");
}

function errorMessage()
{
  $("#result").text("ERROR");
  clearInfo();
  console.log("Errored!");
}

//this clears arrays of info as well as counters
function clearInfo()
{
  numberArray = [];
  operatorArray = [];
  counterNumbers = 0;
  counterOperators = 0;
  console.log("Info Cleared!");
}

//this function concatenates multi-digit numbers or adds operator
function secondCheckButton(justThis)
{
  switch(thisButtonData)
  {
  case 'number':
  buttonNumber = thisButtonData;
  storeNumberData += buttonNumber;
  break;
  case 'operator':
  numberArray[counterNumbers] = storeNumberData;
  counterNumbers++;
  buttonData = thisButtonData;
  operatorArray[counterOperators] = buttonData;
  counterOperators++;
  break;
  case 'spec':
  buttonData = thisButtonData;
  specialCases();
  break;
  default:
  errorMessage();
  break;
  }
  console.log("Second Check!"); //This isn't working
}

function specialCases(justThis)
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
  console.log("Special Button 1!"); //This isn't working
}

//this ensures another number comes after operator
function nextCheckButton(thisButtonData)
{
  if(thisButtonData == "number")
  {
    nextNum(thisButtonData);
  }
  else
  {
    nextNonNum(thisButtonData);
  }
  console.log("Third or more Check!"); //This isn't working
}

function nextNum(thisButtonData)
{
  buttonNumber = thisButtonData;
  storeNumberData += buttonNumber;
  canSend = true;
  console.log("Third or more was Num!"); //This isn't working
}

function nextNonNum(thisButtonData)
{
  switch(thisButtonData)
  {
  case 'operator':
  operatorSplit();
  break;
  case 'spec':
  buttonData = thisButtonData;
  finalSpecialCases();
  break;
  default:
  errorMessage();
  break;
  }
  console.log("Third or more non-Num!"); //This isn't working
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
  console.log("Operator Split!"); //This isn't working
}

function finalSpecialCases(justThis)
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
  console.log("Special Buttons 2!"); //This isn't working
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
  console.log("Checked to Send!"); //This isn't working
}

function sendReq()
{
  calculationObject.numbers = numberArray;
  calculationObject.operators = operatorArray;

  console.log("Running POST!");
  $.ajax(
    {
    type: "POST",
    url: "/calculate",
    data: calculationObject,
    success: function()
      {
      console.log("POST worked!");
      }
    });
    getAnswer();
    console.log("Ran GET after POST!"); //This isn't working (Does with sendReq in DocReady)
}

function getAnswer()
{
  console.log("Running GET!");
  $.ajax(
    {
    type: "GET",
    url: "/finished",
    success: function(response)
      {
        console.log("GET worked!");
        updateDom(response);
      }
    });
    console.log("GET complete!");
}

function updateDom(response)
{
  $("#result").append(response);
  console.log("DOM Updated!"); //This isn't working
}

//EXTRA: delay res from server to display for 3000, with "computing" until res
