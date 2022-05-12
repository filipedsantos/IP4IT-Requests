const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

// Connect MongoDB local DB
mongoose.connect(process.env.DATABASE_URL).then(con => {
  //console.log(con.connections);
  console.log('DB connection successfully!');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running (${process.env.NODE_ENV}) on port ${port}...`);
});
