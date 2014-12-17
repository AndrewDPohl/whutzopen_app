var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  app = express(),
  passport = require("passport"),
  session = require("cookie-session"),
  bcrypt = require("bcrypt"),
  request = require("request");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session( {
  secret:'thisismysecretkey',
  name: 'oatmeal-raisen',
  madage: 3600000
}));

//get passport started
app.use(passport.initialize());
app.use(passport.session());

//SERIALIZE USER DATA
passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

//DESERIALIZE
passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
    where: {
      id: id
    }
  })
  .then(function(user){
    done(null, user);
  },
  function(err) {
    done(err, null);
  });
}); 

app.get("/", function (req, res) {
  console.log(req.get("cookie"));
  var rawValue = req.get("cookie")
  var count = parseInt(rawValue) || 0;
  count += 1;
  res.set("Set-Cookie", count)
  res.send("hello " + count);
});


//Show the home page/login page
app.get("/home", function (req, res){
  res.render("site/home");
});

//WHEN SOMEONE WANTS TO SUBMIT A SIGN UP/LOGIN
app.post("/home", function (req, res) {
  console.log("POST /home");
  var newUser = req.body.user;
  console.log("New User:", newUser);
  // CREATE a user and secure their password
  db.users.createSecure(newUser.email, newUser.password, newUser.firstName, newUser.lastName, 
    function () {
      // if a user fails to create make them signup again
      res.redirect("/sign_up");
    },
    function (err, user) {
      // when successfully created log the user in
      // req.login is given by the passport
      req.login(user, function(){
        // after login redirect show page
        console.log("Id: ", user.id)
        res.redirect('/home/' + user.id);
      });
    })
});

/*AFTER CLICKING A BUTTON FROM THE INDEX PAGE, THIS FUNCTION RUNS AND
  REDIRECTS TO THE SHOW PAGE */
app.get("/search", function (req, res) {
  var url = "https://api.foursquare.com/v2/venues/explore?near=San-Francisco,CA&openNow=1&radius=30000&sortByDistance=1&limit=20&query="+ req.query.category +"&client_id=00WTXTLR54SU1KI5HWJZFQYXIINYHAK5TJ5GQDW4LTRQUBZI&client_secret=ML0WO0WL55FISZDM4UJU5YRRMXKGQD040KKEB13GZ5JRGBSD&v=20141216"
  request(url, function (err, response, body) {
    //console.log(body);
    var results = JSON.parse(body);
    console.log(results);
    var venues = results.response.groups[0].items

     // res.send(venues)
    res.render("site/show", {venuesList: venues});

  });
});


// app.get("/users/:id", function (req, res) {
//   var id = req.params.id;
//   db.user.find(id)
//     .then(function (user) {
//       res.render("users/show", {user: user});
//     })
//     .error(function () {
//       res.redirect("/sign_up");
//     })
// });


// When someone wants the login page
app.get("/login", function (req, res) {
  res.render("site/login");
});

// Authenticating a user
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


app.get("/", function (req, res) {
  console.log(req.user)
  // req.user is the user currently logged in

  if (req.user) {
    res.render("site/index", {user: req.user});
  } else {
    res.render("site/index", {user: false});
  }
});

app.get("/index", function (req, res){
  res.render("site/index");
});

// app.get("/show", function (req, res){
//   res.render("site/show");
// });


app.listen(3000, function() {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});
