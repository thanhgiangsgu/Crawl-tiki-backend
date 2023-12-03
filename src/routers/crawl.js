var express = require("express");
const router = express.Router();

const crawl = require("../App/controller/crawl.js");
router.post("/data", crawl.crawlData);

module.exports = router;
