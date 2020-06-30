const cartRepo = require('./../Repositories/cartRepo')

exports.GetAll = (request, response) => {
    cartRepo.GetAll(request.body.token).then(data => response.json(data.recordset));
}

exports.RemoveByID = (request, response) => {
    cartRepo.RemoveByID(request.body.gameID, request.body.token).then(data => response.json(true));
}

exports.Add = (request, response) => {
    cartRepo.Add(request.body).then(data => response.json(data.recordset[0]));
}

exports.Buy = (request, response) => {
    cartRepo.Buy(request.body).then(data => response.json(data.recordset[0]));
}

exports.Replenishment = (request, response) => {
    console.log(request.body);
    
    cartRepo.Replenishment(request.body).then(data => response.json(true));
}

exports.isExist = (request, response) => {      
    cartRepo.isExist( request.body.token, request.body.gameID).then(data => response.json(data.recordset[0]));
}