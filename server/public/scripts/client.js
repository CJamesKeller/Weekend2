$(document).ready(function(){
    $("#submitButton").on("click", function(){
      var name = $("#nameAdd").val();
      var details = $("#detailsAdd").val();

      $.ajax({
        type: "GET",
        url: "/kitty/" + name + "/" + details,
        // "/data/scott/teacher"
        success: function(responseFromServer){
        }
      });
    });

//end of DocReady
});

//send numbers and operation to server as object
//{ x: 3, y: 4, type: Add }

//delay response from server to display for 3000, with "computing" until res

//
