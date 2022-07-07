const express = require('express');
const router = express.Router();
const multer = require('multer');
const readExceLFile = require('../controller/processExcel_Buffer');
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

module.exports = router;