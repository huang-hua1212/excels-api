const express = require('express');
const router = express.Router();
const multer = require('multer');
const readExceLFile = require('../controller/processExcel_Buffer');
const Mssql = require('../controller/mssql');


const uploadMulter = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/xml"
         || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
         || file.mimetype == "application/vnd.ms-excel"
         || file.mimetype == "text/csv") {
            cb(null, true)
            return
        } else {
            cb(null, false)
            return cb(new Error('Allowed only .xml, .xlsx, .csv'))
        }
    }
})

router.post('/upload', uploadMulter.single('file'), (req, res)=>{
    const encodeFile64 = req.file.buffer.toString('base64');
    readExceLFile(encodeFile64).then((data)=>{
        res.json(data);
    });
})

router.post('/create-table-save-excel-to-mssql', uploadMulter.single('file'), (req, res)=>{
    const encodeFile64 = req.file.buffer.toString('base64');
    const mssql = new Mssql();
    const createTableStr = `Create Table ShopList ( id uniqueidentifier, name nvarchar(50) )`;
    // mssql.createTable(req, res);
    readExceLFile(encodeFile64).then((data)=>{
        console.log(data);
    });
})
router.post('/save-excel-to-mssql', uploadMulter.single('file'), async (req, res)=>{
    const encodeFile64 = req.file.buffer.toString('base64');
    const mssql = new Mssql();
    const createTableStr = `Create Table ShopList ( id uniqueidentifier, name nvarchar(50) )`;
    req.excelData = await readExceLFile(encodeFile64);
    mssql.saveExceltoSql(req, res);
    // readExceLFile(encodeFile64).then((data)=>{
    //     req.excelData = data;
    //     console.log(data);
    //     mssql.saveExceltoSql(req, res);
    // });
})



module.exports = router;