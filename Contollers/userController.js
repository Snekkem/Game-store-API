const userRepo = require('./../Repositories/userRepo')
const fs = require('fs');

exports.GetAll = (request, response) => {
    userRepo.GetAll().then(data => response.json(data));
}

exports.GetByID = (request, response) => {
    userRepo.GetByID(request.params.userID ? request.params.userID : 0,
         request.body.token).then(data => response.json(data.recordset[0]));
}

exports.SearchByName = (request, response) => {
    userRepo.SearchByName(request.params.name).then(data => response.json(data));
}

exports.Auth = (request, response) => {
    console.log(request.body);
    
    userRepo.Auth(request.body).then(data => response.json(data.recordset[0]));
}

exports.AddUser = (request, response) => {
    userRepo.AddUser(request.body).then(data => response.json(data.output.UserID));
}

exports.AboutUser = (request, response) => {
    userRepo.AboutUser(request.body.token, request.body.aboutUser).then(data => response.json(data.recordset[0]));
}

exports.UserGames = (request, response) => {   
    userRepo.UserGames(request.params.id ? request.params.id : 0,
         request.body.token).then(data => response.json(data.recordset));
}

exports.UserCart = (request, response) => {      
    userRepo.UserCart(request.body.token).then(data => response.json(data));
}

exports.UserWishes = (request, response) => {      
    userRepo.UserWishes(request.body.token).then(data => response.json(data));
}

exports.isExist = (request, response) => {      
    userRepo.isExist(request.body.token, request.body.gameID).then(data => response.json(data.recordset[0]));
}

exports.getBalance = (request, response) => {      
    userRepo.getBalance(request.body.token).then(data => response.json(data.recordset[0]));
}

exports.uploadImage = (request, response) => {  
 
    console.log(request.body.userID);
    
    var callback = function(err) {
  
        if (!err) {
            let path = `images/${request.body.userID}.jpg`;
            if (fs.existsSync(path)) {
                userRepo.uploadImage(request.body.userID, `http://localhost:8000/${path}`)
                .then(data => {
                    console.log(data.recordset[0]);
                    
                    if(data.recordset[0].Status === 'Success update'){
                        response.json({userImage: `http://localhost:8000/${path}`})
                    } else {
                        response.json({userImage: null})
                    }
                });
                
            } else {
                response.json('ERROR: file does not exists');
            }
        } else {
            response.json(err);
        }
    }
    var data = request.body.byteArray.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer.from(data, 'base64');
    fs.writeFile(`images/${request.body.userID}.jpg`, buf, callback);
}