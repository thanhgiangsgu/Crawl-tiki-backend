var express = require("express");
const router = express.Router();

const crawl = require("../App/controller/crawl.js");
router.post("/data", crawl.crawlData);
router.get("/load-product-suggestions/:id", crawl.getProductSuggestions);

module.exports = router;
