const app = require('express')();
const port = 5000

var cors = require('cors');
app.use(cors());
const Bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb+srv://jakelemar98:Isu02201998@appcluster-btfvs.mongodb.net/test?retryWrites=true&w=majority'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTE

app.post('/api/login', login);

app.get('/api/users', verifyToken, getUsers)

app.post("/api/users/:user_id",  (req, res) => {
    try {
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
        var dbo = req.db.db("app");
        
        var myobj = {
                name: req.body.name,
                user_id: req.param.user_id,
                username: req.body.username,
                password: req.body.password
            };
    
        dbo.collection("users").insertOne(myobj, function(err, response) {
            if (err) throw err;
            res.json({
                response
            });
        });
    } catch (error) {
        console.log(error);
        
        res.sendStatus(500);
    }
});

app.get('/api/user', verifyToken, getUser)

app.put('/api/users/:user_id', verifyToken, updateUser)

app.get('/api/todos', verifyToken, getTodos);

app.post('/api/todos', verifyToken, addTodo);

// app.put('/api/todos/:todo',verifyToken, updateTodo)

app.get("/api/unitTest", (req, res) => {
    res.send({"Hey": "hello"})
})

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
                res.status(200).send({
                    token
                })
            });         
        });
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

function getUser(req, res){
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err){            
            res.sendStatus(403)
        } else {
            delete authData.user["password"]
            
            res.json(authData.user)
        }
    });
}

function getUsers(req, res){
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("app");
    
            dbo.collection('users').find().toArray( function(err, results) {
                if (err) throw err;
                res.json({
                    results
                })
            });
        }
    });
}

function updateUser(req, res){
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err){            
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("app");
            
            var myobj = {
                    $set: {
                        name: req.body.name,
                        username: req.body.username
                    }
                };
            
            var myquery = { user_id: req.param.user_id };

            dbo.collection("users").updateOne(myquery, myobj, {upsert: true}).then((obj) => {
                dbo.collection("users").findOne({ username: req.body.username }, function(err, result){                    
                    jwt.sign({user: result}, 'secretKey', {expiresIn: '1h' }, (err, token) => {
                        res.status(200).send({
                            token
                        })
                    });
                })
            }).catch((err) => {
                res.sendStatus(403)
            })
        }
    });
}

function getTodos(req, res){    
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("app");
    
            dbo.collection('todos').find().toArray( function(err, results) {
                if (err) throw err;
                res.json({
                    results
                })
            });
        }
    });
};

function addTodo(req, res){
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            var dbo = req.db.db("app");
            
            var myobj = {
                    title: req.body.title,
                    message: req.body.message,
                    est_time: req.body.est_time,
                    sugg_worker: req.body.sugg_worker,
                    status: req.body.status,
                    priority: req.body.priority,
                    category: req.body.category,
                    user_created: authData.user.user_id
                };
        
            dbo.collection("todos").insertOne(myobj, function(err, response) {
                if (err) throw err;
                res.json({
                    authData
                });
            });
        }
    });    
};

module.exports = app;