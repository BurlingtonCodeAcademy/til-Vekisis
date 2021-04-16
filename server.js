require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { timeLog } = require("console");
const { cursorTo } = require("readline");
const { ObjectId } = require("bson");
const app = express();
const port = process.env.PORT || 5000;
const staticDIR = path.resolve(".client/public");

//Connection to the localhost database, MongoDB
mongoose.connect("mongodb://localhost:27017/TIL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Schema for each entry
const FactsSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  tags: Array,
  date: String,
});
//Setting a const to the connection
const FactsDB = mongoose.connection;
//Serverside access
const FactsModel = mongoose.model("facts", FactsSchema);

//middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/public"));
const MONGODB_URI = process.env.MONGODB_URI;

//Creates new posts on the user homepage
app.post("/api", (req, res) => {
  const newContent = new FactsModel({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    tags: req.body.tags,
    date: new Date(),
  });
  //error handling
  newContent.save(function (err) {
    if (err) throw err;
  });
  //redirects to the homepage
  res.redirect("/");
});
//Mongo db to api formatting
app.get("/api", async (req, res) => {
  const cursor = await FactsModel.find({});
  //creates an array for the new results
  let results = [];
  await cursor.forEach((fact) => {
    results.push(fact);
  });
  //Displays results
  res.json(results);
});

//pulls from the MongoDB to create individual posts
app.get("/search/:id", async (req, res) => {
  let setSearch = req.query.searchType;
  let setValue = req.query.searchValue;
  const searchCursor = await FactsModel.find({ [setSearch]: setValue });
  //creates an empty array for the result
  let searchResults = [];
  //Goes to the specific objects page
  await FactsModel.forEach((fact) => {
    searchResults.push(fact);
  });

  res.json(searchResults);
});

//This displays a single entry on the page
app.get(`/api/:id`, async (req, res) => {
  let result = await FactsModel.findOne({ _id: ObjectId(req.params.id) });
  res.json(result);
});
//Allows for editing entries
app.post("/api/:id", async (req, res)=>{
    let setObj = { $set: req.body};
    const editFacts = await FactsModel.updateOne(
        { _id: ObjectId(req.params.id)},
        setObj
);

    res.redirect('/');
});
//Allows for deletion
app.post("/delete/:id", async (req,res)=>{
    await FactsModel.deleteOne({_id: ObjectId(req.params.id)});
    res.redirect("/");
});
//Shows the port that the server is being displayed on
app.listen(port, () => {
  console.log("listening on port", port);
});