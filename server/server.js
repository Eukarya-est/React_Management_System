const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const customer_info = require('../server/data/data.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/hello', (req, res) => {
    res.send({ message : 'Hello Express!' });
});

app.get('/api/customers', (req, res) => {
    res.json(customer_info);
})

app.listen(port, () => console.log('Listening on Port %d', port)); 