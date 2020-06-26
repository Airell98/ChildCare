const route = require("express").Router();
const parent = require("./parent");

route.use("/parent", parent);

module.exports = route;
