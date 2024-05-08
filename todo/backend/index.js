const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Replace with your database connection
dotenv.config()
const Routes = require('./routes/routes.js');
const {  mongoose } = require('mongoose');
const MONGODB = process.env.MONGOURI

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', Routes);

mongoose
.connect(MONGODB)
.then (()=>{
  console.log("App connected to database")
})
.catch((error)=>{
  console.log(error.message)
})
app.listen(port, () => console.log(`Server listening on port ${port}`));
