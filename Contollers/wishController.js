const wishRepo = require('./../Repositories/wishRepo')

exports.Remove = (request, response) => {
    wishRepo.Remove(request.body.gameID, request.body.token).then(data => response.json(true));
}

exports.Add = (request, response) => {
    wishRepo.Add(request.body).then(data => response.json(data.recordset[0]));
}

exports.isExist = (request, response) => {      
    wishRepo.isExist(request.body.token, request.body.gameID).then(data => response.json(data.recordset[0]));
}
