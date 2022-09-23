const sql = require('mssql');
const MssqlUtil = require('../utils/mssqlUtil');

function Mssql() {
    const mssql = new MssqlUtil();

    Mssql.prototype.insert = async (req, res) => {
        const { sqlDataToInsert } = req;
        var sqlStr1 =`INSERT INTO shoplisttest(serialCode,areaCode,assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
            screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
            materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo)
        SELECT DISTINCT
            serialCode,areaCode,
            assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
            screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
            materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo
        FROM (
            values`;
        var sqlStrArr1 = [];
        for (let sheetN of Object.keys(sqlDataToInsert)) {
            for (let row of sqlDataToInsert[sheetN]) {
                var sqlStr2;
                var sqlStrArr2 = [];
                for(let key of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']){
                    if(row[key] === undefined) {
                        sqlStrArr2.push('NULL');
                    }else{
                        let str = row[key].toString().trim();
                        if(isNaN(Number(str))){
                            str = str.replace(/\s/g, '|');
                            sqlStrArr2.push(`'${str.trim()}'`);
                        }else{
                            if(Number(str) < 1000 && str.indexOf('.') < 0){
                                sqlStrArr2.push(`'${str.trim()}'`);
                            }else{
                                sqlStrArr2.push(Number(str));
                            }
                        }
                    }
                }
                sqlStr2 = `(${sqlStrArr2.join(',')})`;
                sqlStrArr1.push(sqlStr2);
                if(sqlStrArr1.length>500){
                    sqlStr1+=(sqlStrArr1.join(','));
                    sqlStr1+=`) AS NewNames(serialCode,areaCode,
                        assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
                        screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
                        materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo)
                    WHERE
                        NOT EXISTS (SELECT 1 FROM shoplisttest WHERE shoplisttest.serialCode = NewNames.serialCode);`;
                    sqlStr1 +=`INSERT IGNORE INTO shoplisttest(serialCode,areaCode,assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
                        screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
                        materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo)
                    SELECT DISTINCT
                        serialCode,areaCode,
                        assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
                        screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
                        materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo
                    FROM (
                        values`;
                    sqlStrArr1 = [];
                }
            }
            // sqlStr1+=(sqlStrArr1.join(','));
        }
        sqlStr1+=(sqlStrArr1.join(','));
        sqlStr1+=`) AS NewNames(serialCode,areaCode,
            assembleCode,formworkFormat,nonStandardSlotting,screwWidth,
            screwHeight,installationGuide,attachedEC,R_Angle,patchInformation,
            materialCategory,quantity,onepieceArea,totalArea,packageCode,orderCode,memo)
        WHERE
            NOT EXISTS (SELECT 1 FROM shoplisttest WHERE shoplisttest.serialCode = NewNames.serialCode);`;

        console.log(sqlStr1);


        try{
            await mssql.sql(sqlStr1);
            res.json({
                status: 'success',
                // data,
            });
        }catch (err) {
            console.log(err);
            
            res.json({
                status: 'fail',
                message: err,
            });
        }
    };
    Mssql.prototype.createTable = (req, res) => {
        var params = req.params;
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query('Create Table shoplisttest ( id uniqueidentifier, name nvarchar(50) )', function (err, data) {
                if (err) console.log(err);
            });
        });
    };
    Mssql.prototype.saveExceltoSql = async (req, res) => {
        const data = await mssql.sql('select GETDATE()');
        res.json({
            status: 'success',
            data,
        });
    };
}

module.exports = Mssql