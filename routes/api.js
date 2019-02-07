const router = require("express").Router();
const articleController = require("../controllers/articleController.js"); 

router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticle);
router.post("/articles/:id", articleController.createArticle);
router.get("/scrape", articleController.scrapeArticles);
router.delete("/articles", articleController.clearArticles);
router.put("/articles/:id", articleController.saveArticle);
router.get("/saved", articleController.showSavedArticles);
router.get("/notes", articleController.showSavedArticles);
router.put("/unsave/:id", articleController.unsaveArticle);

module.exports = router;
