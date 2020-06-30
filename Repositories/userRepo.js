const repo = require('./helper');

exports.GetAll = async () => {
    return await repo.queryDb('SELECT * FROM Users')
};

exports.GetByID = async (userID, token) => {
    return await repo.executeDB('stpGetUserProfile',
    [
        {
            Name: 'UserID',
            Value: userID
        },
        {
            Name: 'Token',
            Value: token
        }
    ],
    []
)
};

exports.AddUser = async (data) => {
    return await repo.executeDB('stp_AddUser',
        [
            {
                Name: 'UserName',
                Value: data.userName
            },
            {
                Name: 'Email',
                Value: data.email
            },
            {
                Name: 'Location',
                Value: data.location
            },
            {
                Name: 'Password',
                Value: data.password
            }
        ],
        [
            {
                Name: 'UserID'
            }
        ])
};

exports.Auth = async ({ email, password } = data) => {
    return await repo.executeDB('stp_Auth',
        [
            {
                Name: 'Email',
                Value: email
            },
            {
                Name: 'Password',
                Value: password
            }
        ],
        []
    )
};

exports.SearchByName = async (name) => {
    return await repo.queryDb(`SELECT * FROM Users WHERE UserName LIKE '%${name}%'`)
};

exports.UserGames = async (userID, token) => {
    return await repo.executeDB('stpGetGamesProfile',
    [
        {
            Name: 'UserID',
            Value: userID
        },
        {
            Name: 'Token',
            Value: token
        }
    ],
    []
)
}

exports.UserCart = async (token) => {
    return await repo.queryDb(`SELECT Users.UserName, Users.UserImage, Games.ID as GameID, Games.[Name], Games.Price, Pictures.[Path]
    FROM ((((Carts JOIN Users ON Carts.UserID = Users.ID) JOIN UserToken ON UserToken.UserID = Users.ID) JOIN Games ON Carts.GameID = Games.ID) JOIN Pictures ON Games.ID = Pictures.GameID)
    WHERE Pictures.ID IN  (SELECT MIN(Pictures.ID) FROM Pictures JOIN Games ON Pictures.GameID = Games.ID GROUP BY Games.ID) AND 
    UserToken.Token = '${token}'`)
};

exports.UserWishes = async (token) => {
    return await repo.queryDb(`SELECT Users.UserName, Users.UserImage, Games.ID as GameID, Games.[Name], Games.Price, Pictures.[Path]
    FROM ((((Wishes JOIN Users ON Wishes.UserID = Users.ID) JOIN UserToken ON UserToken.UserID = Users.ID) JOIN Games ON Wishes.GameID = Games.ID) 
    JOIN Pictures ON Games.ID = Pictures.GameID)
    WHERE Pictures.ID IN  (SELECT MIN(Pictures.ID) FROM Pictures JOIN Games ON Pictures.GameID = Games.ID GROUP BY Games.ID) AND 
    UserToken.Token = '${token}'`)
};

exports.isExist = async (token, gameID) => {
    return await repo.executeDB('stp_isBought',
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

exports.AboutUser = async (token, aboutUser) => {
    return await repo.executeDB('stp_UpdateUserAbout',
        [
            {
                Name: 'Token',
                Value: token
            },
            {
                Name: 'AboutUser',
                Value: aboutUser
            }
        ],
        []
    )
};

exports.getBalance = async (token) => {
    return await repo.executeDB('stp_GetUserBalance',
        [
            {
                Name: 'Token',
                Value: token
            }
        ],
        []
    )
};

exports.uploadImage = async (userID, path) => {
    return await repo.executeDB('stp_UpdateUserImage',
        [
            {
                Name: 'UserID',
                Value: userID
            },
            {
                Name: 'Path',
                Value: path
            }
        ],
        []
    )
};

