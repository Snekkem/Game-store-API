const express = require("express");
const cartController = require("../Contollers/cartContreller");
const cartRouter = express.Router();

cartRouter.post('/getAll', cartController.GetAll)
cartRouter.post('/add', cartController.Add)
cartRouter.post('/buy', cartController.Buy)
cartRouter.patch('/', cartController.Replenishment)
cartRouter.post('/delete', cartController.RemoveByID)
cartRouter.post("/isExist", cartController.isExist);

module.exports = cartRouter;