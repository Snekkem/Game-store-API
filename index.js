const express = require('express')
const server = express();
const sql = require("mssql/msnodesqlv8");
const bodyParser = require('body-parser')

server.use(bodyParser.json())

let config = {
    server: "(localdb)\\MSSQLLocalDB",
    database: "GameStore",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
};

server.get('/users', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query("select * from users")
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.get('/users/:name', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`SELECT * from Users WHERE [UserName] = '${req.params.name}'`)
                .then((data) => {
                    res.json(data.recordsets[0]);
                });
            pool.close();
            res.end()
        });
    })();
})

server.get('/users/:id', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`Select * from users WHERE ID = ${req.params.id}`)
                .then((data) => {
                    res.json(data.recordset[0])
                });
            pool.close();
            res.end()
        });
    })();
})

server.post('/users', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`INSERT INTO Users (UserName, Email, Location, AboutUser, UserImage, Password)
                 values ('${req.body.UserName}', '${req.body.Email}', '${req.body.Location}',
                  '${req.body.AboutUser}', '${req.body.UserImage}', '${req.body.Password}')`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

server.delete('/users/:id', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`DELETE FROM Users WHERE ID = ${req.params.id}`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

server.put('/users', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`UPDATE Users SET Name='${req.body.Name}', Email='${req.body.Email}', Password='${req.body.Password}'
                WHERE ID=${req.body.ID}`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

//games

server.get('/', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query("select * from users")
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.get('/games', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`select * from Games`)
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.get('/games/:id', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`select * from Games WHERE [Name] = '${req.params.id}'`)
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.post('/games', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`INSERT INTO Games ([Name], [Description], [Price] ,[GameImage])
                values ('${req.body.Name}', '${req.body.Description}', '${req.body.Price}', '${req.body.GameImage}')`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

//Requirements

server.get('/requirements', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query("select * from requirements")
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.post('/requirements', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`INSERT INTO [Requirements] ([GameID],[OC] ,[Processor] ,[RAM] ,[VideoCard] ,[DirectX] ,[DiskSpace] ,[GameID])
                 values ('${req.body.GameID}','${req.body.OC}', '${req.body.Processor}', '${req.body.RAM}',
                  '${req.body.VideoCard}', '${req.body.DirectX}', '${req.body.DiskSpace}','${req.body.GameID}')`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

//reviews

server.get('/reviews', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query("select * from Reviews")
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

server.post('/reviews', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`INSERT INTO Reviews ([GameID], [UserID],  ,[Review] ,[isLike])
                values ('${req.body.GameID}', '${req.body.UserID}', '${req.body.Review}', '${req.body.isLike}')`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

server.delete('/reviews/:id', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`DELETE FROM Reviews WHERE ID = ${req.params.id}`)
                .then((data) => {
                    res.json(data)
                });
            pool.close();
            res.end()
        });
    })();
})

//genre

server.get('/genres/:id', (req, res) => {
    (async () => {
        const pool = new sql.ConnectionPool(config);
        pool.connect().then(async () => {
            await pool
                .request()
                .query(`SELECT * from Genres WHERE Genre = '${req.params.id}'`)
                .then((data) => {
                    res.json(data.recordsets);
                });
            pool.close();
            res.end()
        });
    })();
})

const service = server.listen(8000, () => console.log(`Server started at: localhost:${service.address().port}`));