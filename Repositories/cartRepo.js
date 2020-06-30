const repo = require('./helper');

exports.GetAll = async (token) => {
    return await repo.executeDB('stp_GetAllItems', 
    [
            {
                Name: 'Token',
                Value: token
            }
    ],
    []
    );
}

exports.RemoveByID = async (gameID, token) => {
    return await repo.executeDB('stp_DeleteGameFromCart', 
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

exports.Add = async ({ token, gameID } = data) => {
    return await repo.executeDB('stp_AddItemCart',
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

exports.isExist = async (token, gameID) => {
    return await repo.executeDB('stp_isInCart',
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


exports.Buy = async ({ token } = data) => {
    return await repo.executeDB('stp_Buy',
        [
            {
                Name: 'Token',
                Value: token
            }
        ],
        []
    );
}


exports.Replenishment = async ({ID, Balance} = data) => {
    return await repo.queryDb(`UPDATE Users SET Balance = ${Balance} WHERE ID = ${ID}`);
}