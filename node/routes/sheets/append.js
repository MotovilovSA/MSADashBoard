var google = require('googleapis');

exports.listMajors = function (auth, values, callback) {

    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.append(
        {
            auth: auth,
            spreadsheetId: '1SETLvi1kbZEnWvUGpXwVOPTX_ZWxcFFqkZKiAra0Caw',
            range: 'A39:G39',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            includeValuesInResponse: true,
            resource: {
                values: [values.values]                
            }
        }, function (err, response) {
            console.log(response);
            callback(response.updates.updatedData.values);
        })
}