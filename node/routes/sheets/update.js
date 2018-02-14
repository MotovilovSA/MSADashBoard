var google = require('googleapis');

exports.listMajors = function (auth, values) {

    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.update(
        {
            auth: auth,
            spreadsheetId: '1SETLvi1kbZEnWvUGpXwVOPTX_ZWxcFFqkZKiAra0Caw',
            range: values.rowNo,
            valueInputOption: 'RAW',
            resource: {
                values: [values.values]                
            }
        }, function (err, response) {
            console.log(response);
        })
}