const request = require('supertest');
const app = require('../index');

describe('Records', () => { 
  
  it('getRecords working just fine..', (done) => {

    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2016-07-06",
        endDate: "2016-07-08",
        minCount: 2700,
        maxCount: 3000
      })
      .expect(200)
      .end(function (err, res) {
        if (err) { 
          return done(err);
        };
        expect(res.body.code).toBe(0);
        expect(res.body.msg).toBe("Success");
        done();
      });

  }); 

  it('getRecords is NOT working just fine..', (done) => {

    request(app)
      .post('/api/v1/records')
      .send({
        startDate: "2500",
        endDate: "2016-07-08",
        minCount: 2700,
        maxCount: 3000
      })
      .expect(400)
      .end(function (err, res) {
        if (err) { 
          return done(err);
        };
        expect(res.body.code).toBe(2);
        expect(res.body.msg).toBe("Please check your input values.");
        done();
      });

  }); 

});