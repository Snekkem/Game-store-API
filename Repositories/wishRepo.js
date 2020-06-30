const repo = require('./helper');

exports.Remove = async (gameID, userID) => {
    console.log(gameID, userID);

    return await repo.queryDb(`DELETE FROM Wishes WHERE GameID = ${gameID} AND UserID = ${userID}`);
}

exports.Add = async ({ token, gameID } = data) => {
    return await repo.executeDB('stp_AddItemWish',
        [
            {
                Name: 'Token',
                Value: token
            },
            {
                Name: 'GameID',
                Value: gameID
            }
        ],
        []
    );
}


exports.Remove = async (gameID, token) => {
    return await repo.executeDB('stp_DeleteGameFromWishlist', 
    [
            {
                Name: 'GameID',
                Value: gameID
            },
            {
                Name: 'Token',
                Value: token
            }
    ],
    []
    );
}

exports.isExist = async (token, gameID) => {
    return await repo.executeDB('stp_isInWishlist',
        [
            {
                Name: 'Token',
                Value: token
            },
            {
                Name: 'GameID',
                Value: gameID
            }
        ],
        []
    )
};