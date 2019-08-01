// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("POST /login", () => {
    // Test to get all Companies
    it("login user", (done) => {
            chai.request(app).post('/api/login')
            .send({username: "username", password:  "password"})
            .end((err, res) => { 
                if (err) done(err);                           
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it("login user", (done) => {
        chai.request(app).get('/api/unitTest')
        .end((err, res) => {
            if (err) done(err);            
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
        });
    });
});

