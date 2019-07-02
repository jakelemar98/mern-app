

const app = require('express')();
const port = 5000

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://mongodb:27017/mydb'));


app.get('/companies', getCompanies);

app.get('/addCompany', addCompany);

app.listen(process.env.PORT || 5000)

function getCompanies (req, res) {
    var dbo = req.db.db("mydb");

    dbo.collection('customers').find().toArray( function(err, results) {
        res.send(results)
    });

    req.db.close();
};

function addCompany (req, res) {
    var dbo = req.db.db("mydb");

    var myobj = { name: "Company LLC", address: "Highway 9" };

    dbo.collection("customers").insertOne(myobj, function(err, response) {
        if (err) throw err;
        res.send("1 document inserted");
        req.db.close();
    });
} 
