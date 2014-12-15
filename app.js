var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
  res.send("HELLO WORLD");
});


app.listen(3000, function() {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});
