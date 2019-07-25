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
            .send({username: "jakelemar98", password:  "Isu02201998"})
            .end((err, res) => {                                
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe("GET /test", () => {
    // Test to get all Companies
    it("login user", (done) => {
            chai.request(app).get('/api/unitTest')
            .end((err, res) => {                
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

