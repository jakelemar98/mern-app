const app = require('express')();

require('custom-env').env(true)

const SpringCloudConfig = require('spring-cloud-config');
 
const configOptions = {
    configPath: __dirname + '/config',
    activeProfiles: [process.env.APP_PROFILE],
    level: 'info'
};

let myConfig;

SpringCloudConfig.load(configOptions).then(theConfig => {
   myConfig = theConfig;
   
   const port = myConfig.app.port

   var cors = require('cors');
   app.use(cors());   
   const Bcrypt = require("bcryptjs");
   const jwt = require('jsonwebtoken')
   
   var ObjectID = require('mongodb').ObjectID;
   var expressMongoDb = require('express-mongo-db');
   app.use(expressMongoDb(myConfig.mongo.db.conn));
   
   var bodyParser = require('body-parser');
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   
   // ROUTE
   
   app.post('/api/login', login);

   app.get('/api/user', verifyToken, getUser)
   app.get('/api/users', verifyToken, getUsers)   
   app.post("/api/users", addUser)
   app.get('/api/user/:username', checkUser)
   app.put('/api/users/:user_id', verifyToken, updateUser)
   app.put('/api/users/password/:id', verifyToken, updateUserPass)
   
   app.get('/api/todos', verifyToken, getTodos);
   app.post('/api/todos', verifyToken, addTodo);
   app.put('/api/todos/:todo',verifyToken, updateTodo)
   app.delete('/api/todos/:todo',verifyToken, deleteTodo)
   
//    app.get('/api/teams', verifyToken, getTeams);
   app.post('/api/teams', addTeam);
//    app.put('/api/todos/:team',verifyToken, updateTeam)
//    app.delete('/api/todos/:team',verifyToken, deleteTeam)

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

   function checkUser(req, res){
        var username = req.params.username;
        var dbo = req.db.db("app");
        try {
            dbo.collection("users").findOne({ username: username }, function(err, result){                    
                if (!result) {
                    res.status(200).send({ result: false })
                } else {
                    res.status(200).send({ result: true })
                }
            })
        } catch (error) {
            res.sendStatus(500);
        }
   }

   function addUser(req, res){
    try {
        console.log(req.body);
        
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
        var dbo = req.db.db("app");
        
        var myobj = {
                first: req.body.first,
                last: req.body.last,
                username: req.body.username,
                password: req.body.password,
                user_groups: ["User"]
            };
    
        dbo.collection("users").insertOne(myobj, function(err, response) {
            if (err) throw err;
            response = response.ops[0]._id
            res.json({
                response
            });
        });
    } catch (error) {
        console.log(error);        
        res.sendStatus(500);
    }
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
               
               var myquery = { user_id: req.params.user_id };
   
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
   
   function updateUserPass(req, res){
       jwt.verify(req.token, 'secretKey', (err, authData) => {
           if (err){            
               res.sendStatus(403)
           } else {
               var dbo = req.db.db("app");
   
               hashedPass = Bcrypt.hashSync(req.body.newPassword, 10);
   
               var obj = {
                   $set: {
                       password: hashedPass
                   }
               }
               
               var myquery = {_id: new ObjectID(req.params.id)};
   
               dbo.collection("users").findOne( myquery, function(err, response) {
                   if (err) throw err;
                   if(!Bcrypt.compareSync(req.body.oldPassword, response.password)) {                
                       return res.status(400).send({ message: "The password is invalid" });
                   }
                   dbo.collection("users").updateOne( myquery, obj, {upsert: true}).then((obj) => {
                       res.status(200).send({
                           obj
                       })
                   }).catch((err) => {
                       res.sendStatus(500)
                   })
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
   
   function updateTodo(req, res){
       jwt.verify(req.token, 'secretKey', (err, authData) => {
           if (err) {
               res.status(403).send({
                   err
               })
           } else {
               var dbo = req.db.db("app");
               
               var myobj = {
                       $set: {
                           message: req.body.message,
                           est_time: req.body.est_time,
                           sugg_worker: req.body.sugg_worker,
                           status: req.body.status,
                           priority: req.body.priority,
                       }
                   };
           
               var myquery = {_id: new ObjectID(req.params.todo)};
               dbo.collection("todos").updateOne(myquery, myobj, {upsert: true}).then((obj) => {
                   res.status(200).send({
                       obj
                   })
               }).catch((err) => {
                   res.sendStatus(500)
               })
           }
       });    
   }
   
   function deleteTodo(req, res){
       jwt.verify(req.token, 'secretKey', (err, authData) => {
           if (err) {
               res.status(403).send({
                   err
               })
           } else {
               var dbo = req.db.db("app");
               var query = {_id: new ObjectID(req.params.todo)};
   
               dbo.collection("todos").deleteOne(query).then((obj) => {
                   res.status(200).send({
                       obj
                   })
               }).catch((err) => {
                   res.sendStatus(500)
               })
           }
       });   
   }

   function addTeam(req, res){
    try {        
        var dbo = req.db.db("app");
        
        var myobj = {
                team: req.body.team_name,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                email: req.body.email,
                team_owner: req.body.team_owner
            };
    
        dbo.collection("teams").insertOne(myobj, function(err, response) {
            if (err) throw err;
            res.json({
                response
            });
        });
    } catch (error) {
        console.log(error);        
        res.sendStatus(500);
    }
   }

});
module.exports = app;

