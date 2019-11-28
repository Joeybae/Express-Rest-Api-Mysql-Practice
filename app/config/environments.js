const environments = {
    development: {
      mysql: {
        username: 'root',
        password: 'Bae8921!',
        database: 'node_api_codelab_dev'
      },

      sequelize: {
        force: false
      }
    },
  
    test: {
      mysql: {
        username: 'root',
        password: 'Bae8921!',
        database: 'node_api_codelab_test'
      },

      sequelize: {
        force: true
      }
    },
  
    production: {
  
    }
  }
  
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  module.exports = environments[nodeEnv];