var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
const http = require('http');

// connection to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "products",
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");  
    var sql = "INSERT INTO orders (odertitle, description, price,quantity,category) VALUES ('test', 'test', 'test','test','test')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");


    http.createServer( (req, res) => {
        res.write("hello world"); //write a response to the client
        res.end(); //end the response
      }).listen(3000, "192.168.146.1");
  });
  
});


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Restful running on port 3000");
});

app.post("/register/", (req, res, next) => {
  var sqldata = req.body;
  var fullname = sqldata.fullname;
  var email = sqldata.email;
  var phone = sqldata.phone;
  var password = sqldata.password;

  con.query("SELECT * FROM user where email=?", [email], function (
    err,
    result,
    fields
  ) {
    con.on("error", (err) => {
      console.log("Error in Mysql", err);
    });

    if (result && result.length) {
      res.json("User already exist");
    } else {
      var sql = "INSERT INTO user (fullname,email,phone,password) VALUES (?,?,?,?)";
      var values = [fullname, email, phone, password];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Register Success");
        console.log("Registered" + sqldata);
      });
    }
  });
});
app.post("/login/", (req, res, next) => {
  var data = req.body;
  var email = data.email;
  var password = data.password;

  con.query("SELECT * FROM user where email = ?", [email], function (
    err,
    result,
    fields
  ) {
    con.on("error", (err) => {
      console.log("[MySQL ERROR]", err);
    });

    if (result && result.length) {
      if (password == result[0].password) {
        res.json(["Valid user"]);
      } else {
        res.json("Invalid user");
      }
    }
  });
});


app.post("/feedback/", (req, res, next) => {
  var sqldata = req.body;
  var pname = sqldata.pname;
  var pfeedback = sqldata.pfeedback;



      var sql = "INSERT INTO feedback (pname,pfeedback) VALUES (?,?)";
      var values = [pname, pfeedback];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Feedback Submited Successfully");
        console.log("Submited" + sqldata);
      });
    
  });






