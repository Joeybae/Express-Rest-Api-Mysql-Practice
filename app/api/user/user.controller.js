const models = require('../../models/models');

//create
exports.create = (req, res) => {
  const name = req.body.name || '';
  if (!name.length) {
    return res.status(400).json({error: 'Incorrenct name'});
  }

  models.User.create({
    name: name
  }).then((user) => res.status(201).json(user))
};

//read(전체)
exports.index = (req, res) => {
  models.User.findAll()
      .then(users => res.json(users));
};

//read(특정)
exports.show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({error: 'Incorrect id'});
  }

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'No User'});
    }

    return res.json(user);
  });
};

//delete
exports.destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({error: 'Incorrect id'});
  }

  models.User.destroy({
    where: {
      id: id
    }
  }).then(() => res.status(204).send());
};

//update
exports.update = (req, res) => {
    describe('PUT /users/:id', () => {
    it.only('should return 200 status code', (done) => {
        request(app)
            .put('/users/1')
            .send({
            name: 'foo'
            })
            .end((err, res) => {
            if (err) throw err;
            done();
            });
        });
    });
    res.send();
}