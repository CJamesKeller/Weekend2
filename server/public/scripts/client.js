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
      buttonClicked(thisButton);
      console.log("Click Listener!");
    });
//end of DocReady
});

//checks for which buttons have been pressed in what order
function buttonClicked(thisButton)
{
  if(counterOperators === 1)
  {
    nextCheckButton(thisButton);
  }
  else if(counterNumbers === 1)
  {
    secondCheckButton(thisButton);
  }
  else
  {
    firstCheckButton(thisButton);
  }
  console.log("Click Sorted!");
}

//this function ensures first button is a number
function firstCheckButton(thisButton)
{
  if(thisButton.data("number") !== undefined)
  {
    buttonNumber = thisButton.data("number");
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
function secondCheckButton(thisButton)
{

  // ***
  //This has be changed into if statements
  // ***

  switch(thisButton.data)
  {
  case 'number':
  buttonNumber = thisButton.data;
  storeNumberData += buttonNumber;
  break;
  case 'operator':
  numberArray[counterNumbers] = storeNumberData;
  counterNumbers++;
  buttonData = thisButton.data;
  operatorArray[counterOperators] = buttonData;
  counterOperators++;
  break;
  case 'spec':
  buttonData = thisButton.data;
  specialCases();
  break;
  default:
  errorMessage();
  break;
  }
  console.log("Second Check!"); //This isn't working
}

function specialCases(thisButton)
{
  if(thisButton.data("spec") == "clear")
  {
    $("#result").empty();
    clearInfo();
  }
  else if (thisButton.data("spec") == "perform")
  {
    errorMessage();
  }
  console.log("Special Button 1!"); //This isn't working
}

//this ensures another number comes after operator
function nextCheckButton(thisButton)
{
  if(thisButton.data("spec") === undefined && thisButton.data("operator") === undefined && thisButton.data("number") !== undefined)
  {
    nextNum(thisButton);
  }
  else
  {
    nextNonNum(thisButton);
  }
  console.log("Third or more Check!"); //This isn't working
}

function nextNum(thisButton)
{
  buttonNumber = thisButton.data("number");
  storeNumberData += buttonNumber;
  canSend = true;
  console.log("Third or more was Num!"); //This isn't working
}

function nextNonNum(thisButton)
{

  // ***
  //This has be changed into if statements
  // ***

  switch(thisButton.data)
  {
  case 'operator':
  operatorSplit();
  break;
  case 'spec':
  buttonData = thisButton.data;
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

function finalSpecialCases(thisButton)
{
  if(thisButton.data("spec") == "clear")
  {
    $("#result").empty();
    clearInfo();
  }
  else if (thisButton.data("spec") == "perform")
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
}

function updateDom(response)
{
  $("#result").append(response);
  console.log("DOM Updated!"); //This isn't working
}

//EXTRA: delay res from server to display for 3000, with "computing" until res
