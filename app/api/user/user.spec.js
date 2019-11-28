const should = require('should');
const request = require('supertest');
const app = require('../../../app');
const models = require('../../models/models');
const syncDatabase = require('../../../bin/sync-databse');

describe('GET /users', () => {
  before('sync database', (done) => {
    syncDatabase().then(() => done());
  });

  const users = [
    {name: 'alice'},
    {name: 'bek'},
    {name: 'chris'}
  ];

  before('insert 3 users into database', (done) => {
    models.User.bulkCreate(users).then(() => done());
  });

  it('should return array', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
            if (err) {
              throw err;
            }
            done();
        });
  });

  //destroy
  it('DELETE /:id', (done) => {
    request(app)
    .delete('/users/2')
    .expect(204)
    .end((err, res) => {
      if(err){
        throw err;
      }
      done();
    });
  });

  //create
  it('POST /users', (done) => {
    request(app)
    .post('/users')
    .send({
      name: 'test'
    })
    .expect(201)
    .end((err, res) => {
      if(err){
        throw err;
      }
      done();
    });
  });

  after('clear up database', (done) => {
    syncDatabase().then(() => done());
  });
})