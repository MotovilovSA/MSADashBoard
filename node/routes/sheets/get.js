var google = require('googleapis');

exports.listMajors = function (auth, data, callback) {

    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: '1SETLvi1kbZEnWvUGpXwVOPTX_ZWxcFFqkZKiAra0Caw',
        range: `A${data.rowFrom}:H${data.rowTo}`,
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        // console.log(response);
        callback(response);
    });

}