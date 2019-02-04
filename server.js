var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");



// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes
const routes = require("./routes");

app.use(routes);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


// // Scrape
// console.log("\n***********************************\n" +
//             "Grabbing every thread name, link, summary, last update, and image\n" +
//             "from WSJ's What's News board:" +
//             "\n***********************************\n");

// // Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
// axios.get("https://www.wsj.com/news/whats-news").then(function(response) {

//   // Load the Response into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(response.data);

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   $("div.item-container").each(function(i, element) {

//     // Save the text of the element in a "title" variable
//     var title = $(element).find("a").text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).find("a").attr("href");
//     var summary = $(element).find("p").text();
//     var lastUpdate = $(element).find("div.time-container").text();
//     var image = $(element).find("a.headline-image").find("img").attr("data-src");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link,
//       summary: summary,
//       lastUpdate: lastUpdate,
//       image: image
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });