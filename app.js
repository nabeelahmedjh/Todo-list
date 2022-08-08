const express = require("express");
const bodyParser = require("body-parser");


const app = express();


app.get("/", (req, res) => {
    res.send("<h1>TODO list</h1>")
})


app.listen(3000, () => {
    console.log("App is running at port 3000");
})