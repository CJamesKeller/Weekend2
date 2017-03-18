var buttonData;
var storeNumberData;
var calculationObject = {};

$(document).ready(function()
{
    $("button").on("click", checkButton());

//end of DocReady
});

function checkButton()
{
  switch(this.data)
  {
  case 'number':
  buttonData = this.dataNumber;
  storeNumberData += buttonData;
  break;
  case 'spec':
  buttonData = this.dataSpec;
  break;
  case 'operator':
  buttonData = this.dataOperator;
  break;
  default:
  buttonData = "Error!";
  break;
  }
  createCalcObject();
}

function createCalcObject()
{

}

function sendReq()
{
  $.ajax(
    {
    type: "POST",
    url: "/index.html",
    data: buttonData,
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
