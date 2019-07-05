const app = require('express')();
const port = 5000

const Bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb+srv://jakelemar98:Isu02201998@appcluster-btfvs.mongodb.net/test?retryWrites=true&w=majority'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES

app.post('/api/login', login);

app.get('/api/companies', verifyToken, getCompanies);

app.post('/api/addCompany', verifyToken, addCompany);

app.listen(process.env.PORT || 5000)

// ROUTE FUNCTIONS

function login(req, res){
    try {
        var dbo = req.db.db("app");
        dbo.collection("users").findOne({ username: req.body.username }, function(err, result){
            if(!result) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            if(!Bcrypt.compareSync(req.body.password, result.password)) {
                return res.status(400).send({ message: "The password is invalid" });
            }
            jwt.sign({user: result}, 'secretKey', {expiresIn: '1h' }, (err, token) => {
                res.json({
                    token
                })
            });         });
    } catch (error) {
        res.status(500).send(error);
    }
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");

        const bearToken = bearer[1];

        req.token = bearToken;

        next();
    } else { 
        res.sendStatus(403);
    }
}

function getCompanies(req, res){    
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("mydb");
    
            dbo.collection('customers').find().toArray( function(err, results) {
                res.json({
                    results
                })
            });
        }
    });
};

function addCompany(req, res){
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("mydb");
            
            var myobj = {
                    name: req.body.name,
                    address: req.body.message,
                    user_id: authData.user.user_id
                };
        
            dbo.collection("customers").insertOne(myobj, function(err, response) {
                if (err) throw err;
                res.json({
                    authData
                });
            });
        }
    });    
};

module.exports = app;