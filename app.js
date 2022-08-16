const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing the model for items schema mongodb
const Item = require(`${__dirname}/todo`);

// connecting to the database
mongoose.connect("mongodb://localhost/todoDB");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// it is making server know that load these files
app.use(express.static("public"));

// creating tasks array

// addDefaultItems();

app.get("/", async (req, res) => {
    const items = [];
    await Item.find({}).then((i) => {
        i.forEach((item) => {
            items.push(item);
        });
    });
    res.render("list", {
        list: "Today",
        taskList: items,
    });
});

app.post("/", (req, res) => {
    let task = req.body.newTask;

    if (req.body.list === "Work") {
        workList.push(task);
        res.redirect("/work");
    } else {
        // dailyTaskList.push(task);
        addItem(task);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { list: "Work", taskList: workList });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.post("/delete", async (req, res) => {
    console.log("in the delete route");
    const taskDoneId = req.body.checkBox;
    try {
        await Item.findOneAndDelete({ _id: taskDoneId });
        console.log("deleted user with id= " + taskDoneId);
        res.redirect("/");
    } catch (e) {
        console.log(e);
    }
});

app.listen(3000, () => {
    console.log("App is running at port 3000");
});

//
//
//
//
async function addDefaultItems() {
    try {
        const itemOne = await Item.create({
            name: "Makes some rice",
        });
        await itemOne.save();
        const itemTwo = await Item.create({
            name: "Buy cola and potato chips",
        });
        await itemTwo.save();
        const itemThree = await Item.create({
            name: "buy gariiiii",
        });
        await itemThree.save();

        console.log("items saved");
    } catch (e) {
        console.log(e);
    }
}

async function addItem(task) {
    try {
        const item = await Item.create({
            name: task,
        });

        await item.save();
        console.log("item saved");
    } catch (e) {
        console.log(e);
    }
}

async function addItemsFromDb() {
    try {
        const itemsDocumentList = await Item.find();
        await itemsDocumentList.forEach((item) => {
            items.push(item.name);
        });
    } catch (e) {
        console.log(e);
    }
}

function dbIsEmpty() {
    try {
        const collection = Item.find();
        return collection.length === 0;
    } catch (e) {
        console.log(e);
    }
}
