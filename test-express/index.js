const express = require('express');

const knexConfig = require('./db/knexfile');

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

let data = {
    name: "Noah",
    age: "19"
}

app.get('/', (req,res) => {
    knex('users')
    .select({
        id: 'id',
        name: 'name'
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.json({success: false, message: 'An error occurred, please try again later.'});
    })
});

app.put('/', (req,res) => {
    data.name = req.query.name;
    res.json(data);
});
