let express = require('express');
let bodyParser = require("body-parser");
let http = require('http');
let path = require('path');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

let homePage = require('./routes');
let sheets = require('./routes/sheets.js');

app.get("/", function (req, res) {
    homePage.index(req, res);
});

app.get("/allValues", function (req, res) {

    let data = {
        apiAction: 'get'
    };

    sheets.sheetsAPI(data, function (values) {
        res.send(values);
    });
});

app.post("/appendString", function (req, res) {
    
    if (!req.body) return res.sendStatus(400);

    let data = {
        apiAction: 'append'
    };

    data.values = req.body;
    sheets.sheetsAPI(data);
    res.end();
});

app.post("/updateString", function (req, res) {
    
    if (!req.body) return res.sendStatus(400);

    let data = {
        apiAction: 'update'
    };

    data.rowNo = `A${req.body.rowNo}:G${req.body.rowNo}`;

    data.values = req.body.values;

    sheets.sheetsAPI(data);
    res.end();
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('server listeninig on port 3000');
})
