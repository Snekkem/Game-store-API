const express = require("express");
const userController = require("../Contollers/userController");
const userRouter = express.Router();

userRouter.post("/register", userController.AddUser);
userRouter.post("/auth", userController.Auth);
userRouter.post("/uploadImage", userController.uploadImage);
userRouter.post("/wishlist", userController.UserWishes);
userRouter.post("/cart", userController.UserCart);
userRouter.post("/isExist", userController.isExist);
userRouter.post("/aboutUser", userController.AboutUser);
userRouter.post("/balance", userController.getBalance);
userRouter.get("/search/:name", userController.SearchByName);
userRouter.post("/games/:id?", userController.UserGames);
userRouter.post("/:userID?", userController.GetByID);

userRouter.get("/", userController.GetAll);

module.exports = userRouter;