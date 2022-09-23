const sql = require('mssql');

class MssqlUtil {
    constructor() {
        this.config = {
            user: process.env.MSSQL_USER,
            password: process.env.MSSQL_PASSWORD,
            server: process.env.MSSQL_IP, // '192.168.100.182',
            database: 'AluminumFormwork',
            trustServerCertificate: true,
            options: {
                encrypt: false,
                idleTimeoutMillis: 130000
            },
        };
        this.sql = this.sql.bind(this);
    }

    sql(sqlStr) {
        return new Promise((resolve, reject) => {
            sql.connect(this.config, async (err) => {
                if (err) console.log(err);
                var request = new sql.Request();
                try {
                    const data = (await request.query(sqlStr)).recordset;
                    resolve(data);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        })
    };
}

module.exports = MssqlUtil;
