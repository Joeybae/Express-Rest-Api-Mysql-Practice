const models = require('../app/models/models');
const config = require('../app/config/environments')

module.exports = () => {
    console.log(models.sequelize.sync({force: config.force}));
  return models.sequelize.sync({force: config.force});
};