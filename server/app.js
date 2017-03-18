var express = require("express");
var app = express();
var path = require("path");
var port = 5000;

//server performs calculations and sends to client for display

app.use(express.static("server/public",
{
  index: "views/index.html"
}));

// app.get("/products", function(req, res)
// {
//   res.send(products);
// });
//
// app.post("/newProduct", function(req, res)
// {
//   var newProduct = req.body;
//   products.push(newProduct);
//   res.sendStatus(200);
// });

app.get("/*", function(req,res)
{

});

app.listen(port, function()
{
  console.log("Listening on port! : ", port);
});
