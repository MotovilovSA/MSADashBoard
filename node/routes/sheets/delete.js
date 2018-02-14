// sheets.spreadsheets.batchUpdate({
// auth: auth,
// // spreadsheetId: '1SH0uVE9f_U0ifUvaQfW73j-Px8sBQew5wdULGLQfGOk',
// spreadsheetId: '1SETLvi1kbZEnWvUGpXwVOPTX_ZWxcFFqkZKiAra0Caw',
// // includeValuesInResponse: true,
// resource: {
//         requests: [
//         {
//                 "deleteDimension": {
//                 "range": {
//                         "sheetId": 29521394,
//                         "dimension": "ROWS",
//                         "startIndex": 38,
//                         "endIndex": 39
//                 }
//                 }
//         }
//         ]
// }
// }, function (err, response) {
// if (err) {
// console.error(err);
// return;
// }
// console.log(JSON.stringify(response, null, 2));
// });