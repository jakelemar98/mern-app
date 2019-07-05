
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jakelemar98:Isu02201998@appcluster-btfvs.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.post("/register",  (req, res) => {
  try {
      req.body.password = Bcrypt.hashSync(req.body.password, 10);
      var dbo = req.db.db("app");
      
      var myobj = {
              name: req.body.name,
              user_id: req.body.user_id,
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