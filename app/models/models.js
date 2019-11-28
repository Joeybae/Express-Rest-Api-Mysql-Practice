const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node_api_codelab', 'root', 'Bae8921!',{
//   host: 'localhost',
//   dialect: 'mysql'// pick one of 'mysql','sqlite','postgres','mssql',
// });

const config = require('../config/environments');
const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password, {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const User = sequelize.define('user', {
    name: Sequelize.STRING
});

module.exports = {
  sequelize: sequelize,
  User: User
}