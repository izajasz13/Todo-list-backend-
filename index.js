const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require ('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },
    () => console.log('Successfully connected to DB.')
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/user', authRoute);
app.use('/api/tasks', taskRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));