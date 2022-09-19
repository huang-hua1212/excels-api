const sql = require('mssql');

function Mssql() {
    this.config =  {
        user: process.env.MSSQL_USER,
        password: process.env.MSSQL_PASSWORD,
        server: 'LAPTOP-G5RAQAQC\\SQLEXPRESS', // '192.168.100.182',
        database: 'AluminumFormwork',
        trustServerCertificate: true,
        options:{
            encrypt: false
        }
    };
    Mssql.prototype.insert = (req, res) => {
        var params = req.params;
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query('insert into [Records] values()', function (err, data) {
                if (err) console.log(err);
                console.log(data);
            });
        });
    };
    Mssql.prototype.createTable = (req, res) => {
        var params = req.params;
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query('Create Table ShopList ( id uniqueidentifier, name nvarchar(50) )', function (err, data) {
                if (err) console.log(err);
                console.log(data);
            });
        });
    };
    Mssql.prototype.saveExceltoSql = (req, res) => {
        sql.connect(this.config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            console.log( Object.keys(req.excelData.sheet1[0]));
            request.query('select * from Records', function (err, data) {
                if (err) console.log(err);
                console.log(data);
            }); 
        });
    };
}

module.exports = Mssql