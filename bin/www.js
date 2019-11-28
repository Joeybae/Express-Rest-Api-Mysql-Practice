const app = require('../app');
const port = 8000;
const syncDatabase = require('./sync-databse');

app.listen(port, () => {
  console.log('Example app listening on port 3000');

  syncDatabase().then(() => {
    console.log('Database sync');
  })
})