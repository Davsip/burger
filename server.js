var express = require("express");
var bodyParser = require("body-parser");

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;



// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var exphbs = require("express-handlebars");

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
/////----

// Static Dir
app.use(express.static("public"));

/// start mysql 

var mysql = require("mysql");

// connection for my sql 

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   /// enter password          <-------------------------
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});


//Root get route.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      throw err;
    }

    // Test it.
    // console.log('The solution is: ', data);

    // Test it.
    // res.send(data);

    res.render("index", {burger_data: data });
  });
});

// Post route -> back to home
app.post("/burgers/create", function(req, res) {
  // Test it.
  // console.log('You sent, ' + req.body.wish);

  // Test it.
  // res.send('You sent, ' + req.body.wish)

  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger_name], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

//////////////////////



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


