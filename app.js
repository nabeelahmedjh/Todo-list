const express = require("express");
const bodyParser = require("body-parser");

// using our own module into app.js
const date = require(`${__dirname}/date.js`);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// it is making server know that load these files 
app.use(express.static("public"))


// creating tasks array
let dailyTaskList = [];
let workList = [];

app.get("/", (req, res) => {

    const day = date.getDate();

    res.render("list", {
        list : day,
        taskList: dailyTaskList
    })
})


app.post("/", (req, res) => {

    let task = req.body.newTask;

    if (req.body.list === "Work") {
        workList.push(task);
        res.redirect("/work")
    } else {
        dailyTaskList.push(task);
        res.redirect("/");
    }
})

app.get("/work", (req, res) => {

    res.render("list", {list : "Work", taskList: workList})
})


app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000, () => {
    console.log("App is running at port 3000");
})



