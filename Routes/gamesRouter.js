const express = require("express");
const gamesController = require("../Contollers/gamesController");
const gamesRouter = express.Router();

gamesRouter.get("/:id/pictures", gamesController.GetPictures);
gamesRouter.get("/:id/genres", gamesController.GetGenre);
gamesRouter.get("/:id/reviews", gamesController.GetReviews);
gamesRouter.post("/delete", gamesController.DeleteReview);
gamesRouter.post("/reviews", gamesController.SendReview);

gamesRouter.get("/:id", gamesController.GetByID);
gamesRouter.get("/search-by-name/:name", gamesController.SearchByName);
gamesRouter.get("/search-by-genre/:name", gamesController.SearchByGenre);

gamesRouter.get("/", gamesController.GetAll);

module.exports = gamesRouter;