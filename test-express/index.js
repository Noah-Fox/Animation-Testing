const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



let data = {
    name: "Noah",
    age: "19"
}

app.get('/', (req,res) => {
    res.json(data);
});

app.put('/', (req,res) => {
    data.name = req.query.name;
    res.json(data);
})
