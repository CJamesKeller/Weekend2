var buttonData;

$(document).ready(function()
{
    $("button").on("click", checkButton());

    sendReq();

//end of DocReady
});

function checkButton(data)
{
  switch(this.data)
  {
  case 'spec':
  buttonData = this.dataSpec;
  break;
  case 'number':
  buttonData = this.dataNumber;
  break;
  case 'operator':
  buttonData = this.dataOperator;
  break;
  default:
  buttonData = "Error!";
  break;
  }
}

function sendReq()
{
  $.ajax(
    {
    type: "GET",
    success: updateDom
    });
}

// $("form").on("submit", function(e)
// {
//   e.preventDefault();
//   var product = {};
//   product.make = $("#make").val();
//   product.model = $("#model").val();
//   console.log(product);
//   $.ajax({
//     type: "POST",
//     url: "/newProduct",
//     data: product,
//     success: function(res)
//     {
//       //It will send status 200 anyways
//       console.log("Success!");
//     }
//   });
//   refreshProducts();
// });
//
// function refreshProducts()
// {
//   //Takes in server-side "products"
//     $.ajax({
//       type: "GET",
//       url: "/products",
//       success: function(response)
//       {
//         console.log(response);
//         displayProducts(response);
//       }
//     });
// }


function updateDom(response)
{
  $("#result").append(response);
}

//send numbers and operation to server as object
//{ x: 3, y: 4, type: Add }

//delay response from server to display for 3000, with "computing" until res

//
