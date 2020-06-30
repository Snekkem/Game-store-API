const gameRepo = require('./../Repositories/gameRepo')

exports.GetAll = (request, response) => {
    gameRepo.GetAll().then(data => response.json(data));
};

exports.GetByID = (request, response) => {
   gameRepo.GetByID(request.params.id).then(data => response.json(data));
};

exports.SearchByName = (request, response) => {
    gameRepo.SearchByName(request.params.name).then(data => response.json(data));
}

exports.SearchByGenre = (request, response) => {
    gameRepo.SearchByGenre(request.params.name).then(data => response.json(data));
}

exports.GetReviews = (request, response) => {    
    gameRepo.GetReviews(request.params.id).then(data => response.json(data));
}

exports.DeleteReview = (request, response) => { 
    gameRepo.DeleteReview(request.body.token, request.body.gameID, request.body.reviewID).then(data => response.json(data.recordset[0]));
}

exports.SendReview = (request, response) => {    
    gameRepo.SendReview(request.body).then(data => response.json(data.recordset[0]));
}

exports.GetGenre = (request, response) => {    
    gameRepo.GetGenre(request.params.id).then(data => response.json(data));
}

exports.GetPictures = (request, response) => {    
    gameRepo.GetPictures(request.params.id).then(data => response.json(data));
}



