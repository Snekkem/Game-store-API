const sql = require("mssql/msnodesqlv8");

let config = {
    server: "(localdb)\\MSSQLLocalDB",
    database: "GameStore",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
};

exports.queryDb = async function (queryString) {
    let pool = await sql.connect(config);
    let data = await pool.request()
        .query(queryString)
    pool.close;
    sql.close;
    return data.recordset;
}

exports.executeDB = async (executeName, params = [], output = []) => {
    let pool = await sql.connect(config);
    let request = await pool.request();
    
    params.forEach(el => {
        request.input(el.Name, el.Value);
    });

    output.forEach(el => {
        request.output(el.Name, 0);
    });
    
    let data = await request.execute(executeName);
    pool.close;
    sql.close;

    return data;
}

