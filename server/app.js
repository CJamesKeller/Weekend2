var express = require("express");
var app = express();
var path = require("path");
var port = 5000;

//server performs calculations and sends to client for display

app.use(express.static("server/public"));

app.get("/", function(req,res)
{

});

app.get("/", function( req, res )
{
  res.sendFile(path.resolve("server/public/views/index.html"));
});

app.listen(port, function()
{
  console.log("Listening on port! : ", port);
});
