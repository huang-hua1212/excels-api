var express = require('express');
var router = express.Router();
var multer = require('multer');
// const xl =require('xlsx');
const readExceLFile = require('../controller/processExcel_Buffer');
var uploadMulter = multer({
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

// function readExceLFile(encodeFile64) {
//     const workBook = xl.read(encodeFile64);
//     const sheetNames = workBook.SheetNames;
//     const excelObj = {}
//     sheetNames.forEach((sheetName)=>{
//         console.log(sheetName);
//         const workSheet = workBook.Sheets[sheetName];
//         const sheetContent = xl.utils.sheet_to_json(workSheet);
//         excelObj[sheetName]= sheetContent;
//     })
// }


router.post('/upload', uploadMulter.single('file'), (req, res)=>{
    const encodeFile64 = req.file.buffer.toString('base64');
    // reafFile: path
    // const workBook =  xl.readFile(encodeFile64);
    // const sheetNames = workBook.SheetNames;
    // const workSheet = workBook.Sheets[sheetNames[0]];
    // const data =xl.utils.sheet_to_json(workSheet);
    // read: buffer
    // const workBook = xl.read(encodeFile64);
    // console.log(workBook);
    // const sheetNames = workBook.SheetNames;
    // const workSheet = workBook.Sheets[sheetNames[1]];
    // const data =xl.utils.sheet_to_json(workSheet);
    // console.log(data);
    readExceLFile(encodeFile64).then((res)=>{
        console.log(res);
    });
})

module.exports = router;