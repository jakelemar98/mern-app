// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("GET /companies", () => {
    // Test to get all Companies
    it("should get all Companies", (done) => {
            chai.request(app).get('/api/companies').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

