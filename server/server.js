// required
const express = require("express");
const app = express();
const mysql = require("mysql");
path = require('path');

const bodyParser = require("body-parser"); // urlencodedParser-თვის განკუთვნილი lib
const urlencodedParser = bodyParser.urlencoded({ extended: true }); // req.body ამის გარეშე არ იმუშავებს

const con = mysql.createConnection({ // mysql-თან connection შექმნა
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio"
});

app.set("view engine", "ejs"); // view engine დაყენება კერძოდ ejs
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/public/index.html");
    res.render("./index.html");
});

// http://localhost:[port]/data - მთავარი ლინკი
app.get("/data", (req, res) => { // მთავარი გვერდი - Display all data
    con.query("SELECT * FROM proektebi", (err, result) => {
      if (err) throw err;
      res.render("data", { data: result }); // display data.ejs
    });
});

// GET (display) insert page
app.get("/insert", (req, res) => {
    res.render("insert");
});

// POST (send info) page
app.post("/insert", urlencodedParser, (req, res) => {
    const values = Object.values(req.body);
    const sql =
      "INSERT INTO `proektebi` (`projectName`, `projectDescription`, `projectLink`) VALUES (?)";
    con.query(sql, [values], (err) => {
      if (err) throw err;
      res.redirect("/data");
    });
});

app.get("/v/all", (req, res) => {
    const sql = `SELECT * FROM proektebi`;
    con.query(sql, (err, result) => {
        res.json(result);
    });
});


// server gashveba portze
app.listen(5555);
console.log(`Server is running on localhost:5555`);