import dotenv from "dotenv"

import express from 'express';
import mongoose from 'mongoose';
import routes from "./routes/routes.js"
import cors from 'cors';

const app = express();


dotenv.config()

const PORT = process.env.PORT|| 5000;
const mongoDBURL = process.env.MONGOURI

// Middleware for parsing request body
app.use(express.json());



app.use(cors());

app.use('/',routes)


mongoose
  .connect( mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });