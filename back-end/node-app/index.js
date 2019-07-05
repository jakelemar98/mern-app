const app = require('express')();
const port = 5000

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb+srv://jakelemar98:<password>@appcluster-btfvs.mongodb.net/test?retryWrites=true&w=majority'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/companies', getCompanies);

app.post('/addCompany', addCompany);

app.listen(process.env.PORT || 5000)

function getCompanies (req, res) {
    var dbo = req.db.db("test");
    
    dbo.collection('companies').find().toArray( function(err, results) {
        res.send(results)
    });

};

function addCompany (req, res) {    
    var dbo = req.db.db("app");

    var myobj = { name: req.body.name, address: req.body.message };

    dbo.collection("companies").insertOne(myobj, function(err, response) {
        if (err) throw err;
        res.send(response);
    });
};

module.exports = app;