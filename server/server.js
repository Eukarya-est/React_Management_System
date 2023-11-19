const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

//Modify Date
// function timestamp(){
//     var today = new Date();
//     today.setHours(today.getHours() + 9);
//     return today.toISOString().replace('T', ' ').substring(0, 19);
// }

//DB connection
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'})

//Get customer data from DB
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER_VIEW",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.get('/api/hello', (req, res) => {
    res.send({ message : 'Hello Express!' });
});

//Post customer data from DB
app.use('/image', express.static('./upload'));

//Insert new customer data from DB
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), null, ?)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday
    let gender = req.body.gender;
    let job = req.body.job;
    // let datetime = timestamp();
    // let createdDate = datetime;
    let deleteFlag = 0;
    let params = [image, name, birthday, gender, job, deleteFlag];
    connection.query(sql, params,
        (err, rows, field) => {
            res.send(rows);
        }
    );
});

//Delete new customer data from DB
app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE CUSTOMER SET DeletedDate = now(), DeleteFlag = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    ) 
});

app.listen(port, () => console.log('Listening on Port %d', port)); 