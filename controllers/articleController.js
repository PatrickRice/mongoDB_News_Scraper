var db = require("../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
    getArticles: function (req, res) {
        db.Article.find({ isSaved: false })
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },
    getArticle: function (req, res){
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("Note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
                console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },
    createArticle: function (req, res){
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },
    scrapeArticles: function (req, res){
        // Scrape
console.log("\n***********************************\n" +
"Grabbing every thread name, link, summary, last update, and image\n" +
"from WSJ's What's News board:" +
"\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("https://www.wsj.com/news/whats-news/").then(function(response) {

// Load the Response into cheerio and save it to a variable
// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
var $ = cheerio.load(response.data);

// An empty array to save the data that we'll scrape
var results = [];

// With cheerio, find each p-tag with the "title" class
// (i: iterator. element: the current element)
$("div.item-container").each(function(i, element) {

// Save the text of the element in a "title" variable
var title = $(element).find("a").text();

// In the currently selected element, look at its child elements (i.e., its a-tags),
// then save the values for any "href" attributes that the child elements may have
var link = $(element).find("a").attr("href");
var summary = $(element).find("p").text();
var lastUpdate = $(element).find("div.time-container").text();
var image = $(element).find("a.headline-image").find("img").attr("data-src");

// Save these results in an object that we'll push into the results array we defined earlier
results.push({
title: title,
link: link,
summary: summary,
lastUpdate: lastUpdate,
image: image
});
db.Article.create(results)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
});

// Log the results once you've looped through each of the elements found with cheerio
console.log(results);
});
        },

    clearArticles: function (req, res){
        db.Article.remove({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        })
    },
    saveArticle: function (req, res){
        db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { isSaved: true }})
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            })
        },
    showSavedArticles: function (req, res){
        db.Article.find({ isSaved: true })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            })
        },
    unsaveArticle: function (req, res){
        db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { isSaved: false }})
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            })
        },
};


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