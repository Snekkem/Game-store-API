const repo = require('./helper');

exports.GetAll = async () => {
    return await repo.queryDb(`SELECT Games.ID, Games.Name, Games.Description, Games.Price, Pictures.[Path] FROM Games JOIN Pictures ON Games.ID = Pictures.GameID 
    WHERE Pictures.ID IN (SELECT MIN(Pictures.ID) FROM Pictures JOIN Games ON Pictures.GameID = Games.ID GROUP BY Games.ID)`);
}

exports.GetByID = async (id) => {
    return await repo.queryDb(`SELECT Games.[Name],Games.[Description], Games.Price, Requirements.OC, Requirements.Processor, Requirements.RAM, Requirements.VideoCard,
    Requirements.DirectX, Requirements.DiskSpace, Developments.GameID, Developments.Publisher, Developments.Release
    FROM ((Games JOIN Requirements ON Games.ID = Requirements.ID) JOIN Developments ON Requirements.ID = Developments.GameID)
    WHERE Games.ID = ${id}`);
}

exports.SearchByName = async (name) => {
    return await repo.queryDb(`SELECT Games.ID, Games.Name, Games.Description, Games.Price, Pictures.[Path] FROM Games JOIN Pictures ON Games.ID = Pictures.GameID 
    WHERE Pictures.ID IN (SELECT MIN(Pictures.ID) FROM Pictures JOIN Games ON Pictures.GameID = Games.ID GROUP BY Games.ID) AND
    Games.[Name] LIKE '%${name}%'`)
};

exports.SearchByGenre = async (name) => {
    return await repo.queryDb(`SELECT Genres.Genre, Games.ID, Games.Price, Games.Name, Pictures.[Path] FROM ((GameGenres JOIN Genres ON GameGenres.GenreID = Genres.ID) JOIN Games ON GameGenres.GameID = Games.ID
    JOIN Pictures ON Games.ID = Pictures.GameID) WHERE Genres.Genre = N'${name}' AND Pictures.ID IN 
        (SELECT MIN(Pictures.ID) FROM Pictures JOIN Games ON Pictures.GameID = Games.ID GROUP BY Games.ID)
    `)
};

exports.GetReviews = async (gameID) => {
    return await repo.queryDb(`SELECT Reviews.ID, Users.ID as UserID, Reviews.Review, Reviews.isLike, Reviews.[Date], Users.UserName, Users.UserImage 
    FROM Reviews JOIN Users ON Reviews.UserID = Users.ID
    WHERE GameID = ${gameID} ORDER BY Reviews.ID DESC`)
}

exports.SendReview = async (data) => {
        return await repo.executeDB('stp_SendReview',
        [
            {
                Name: 'Token',
                Value: data.token
            },
            {
                Name: 'GameID',
                Value: data.gameID
            },
            {
                Name: 'Review',
                Value: data.review
            },
            {
                Name: 'isLike',
                Value: data.isLike
            }
        ],
        []
    )
};

exports.DeleteReview = async (token, gameID, reviewID) => {
    return await repo.executeDB('stp_DeleteReview',
    [
        {
            Name: 'Token',
            Value: token
        },
        {
            Name: 'GameID',
            Value: gameID
        },
        {
            Name: 'ReviewID',
            Value: reviewID
        }
    ],
    []
)
};

exports.GetGenre = async (gameID) => {
    return await repo.queryDb(`SELECT Genres.Genre FROM ((GameGenres JOIN Games ON GameGenres.GameID = Games.ID) 
    JOIN Genres ON GameGenres.GenreID = Genres.ID)
    WHERE Games.ID = ${gameID}`)
}

exports.GetPictures = async (picID) => {
    return await repo.queryDb(`SELECT Pictures.ID, Pictures.[Path] FROM Pictures JOIN Games ON Pictures.GameID = Games.ID
    WHERE Games.ID = ${picID}`)
}

