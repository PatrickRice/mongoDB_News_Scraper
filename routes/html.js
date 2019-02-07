var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Article.find({ where: { isSaved: false } }).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/articles", function(req, res) {
    db.Article.find({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("Note", {
        example: dbExample
      });
    });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ where: { isSaved: true } }).then(function(dbExample) {
      res.render("saved", {
        example: dbExample
      });
    });
  });

  app.post("/articles/:id", function(req, res) {
    db.Article.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("Note", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};