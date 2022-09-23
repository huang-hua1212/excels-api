const xl = require('xlsx');

async function readExceLFile(encodeFile64) {
    const workBook = xl.read(encodeFile64);
    const sheetNames = workBook.SheetNames;
    const excelObj = {}
    await sheetNames.forEach((sheetName)=>{
        const workSheet = workBook.Sheets[sheetName];
        const sheetContent = xl.utils.sheet_to_json(workSheet);
        excelObj[sheetName]= sheetContent;
    })
    console.log(excelObj);
    return excelObj;
}

module.exports = readExceLFile;