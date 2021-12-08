const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config()

// FILES JS
const personRoutes = require('./src/routes/personRoutes');

// Config app for JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// FILE Call
app.use('/person', personRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zahsm.mongodb.net/bancodaAPI?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Connected to MongoDB!!`)
        app.listen(process.env.PORT);
    })
    .catch(err => console.log(err));

