const express = require("express");
const wishController = require("../Contollers/wishController");
const wishRouter = express.Router();

wishRouter.post('/add', wishController.Add)
wishRouter.post("/isExist", wishController.isExist);
wishRouter.post('/delete', wishController.Remove)

module.exports = wishRouter;