
const xl =require('xlsx');
//workbook 物件，指的是整份 Excel 文件。我們在使用 js-xlsx 讀取 Excel 文件之後就會獲得 workbook 物件。
const workBook =  xl.readFile("./files/Book1.xlsx");
const sheetNames = workBook.SheetNames; // 返回 ['sheet1', 'sheet2']
const workSheet = workBook.Sheets[sheetNames[0]];


//返回json資料
// const data =xl.utils.sheet_to_json(worksheet);
const data =xl.utils.sheet_to_json(workSheet);
