const express = require("express");
const router = express.Router();
const redis = require("../redis");

router.get("/", async (_, res) => {
  let todoCount = await redis.getAsync("added_todos");
  if (!todoCount) {
    todoCount = "0";
  }
  res.send({ todoCount });
});

module.exports = router;
