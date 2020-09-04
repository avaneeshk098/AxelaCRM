const { Pool } = require('pg');
const express = require('express');
const bodyParser = require("body-parser");
const jquery = require('jquery');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = process.env.port || 8000;

app.set('view engine', 'jade');

const client = new Pool({
    user: "postgres",
    host: "localhost",
    database: "axela_database",
    password: "rit123XYZ",
    port: "5432"
});

app.get('/',[], (req, resp) => {
    client.query('SELECT * FROM axela_student;',(err,res)=>{
        if(err){
            throw err;
        }
        resp.render("index", { 'name': res });
    });
});

app.get('/add', (req, resp) => {
    resp.sendFile(__dirname+"/input.html")
});

app.post('/student', (req, resp) => {
    var active = false;
    if (req.body.activity == "on"){
        active = true;
    }
    var code = 1;
    if (req.body.course == "Python"){
        code = 2;
    }

    var d = new Date(req.body.dob).toISOString().
    replace(/T.+/, ' ') 
    client.query("INSERT INTO axela_student (student_name, student_age, student_dob, student_mobile, student_email, student_address, student_course_id, student_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", [req.body.name, req.body.age, d, req.body.mobile, req.body.email, req.body.address, code, active], (err, res) => {
        if(err){
            throw err;
        }
        resp.redirect('/')
    });
});

app.post('/delete/:id', (req, resp) => {
    client.query(`DELETE FROM axela_student WHERE student_id = ${req.params.id};`,  (err, res) => {
        if(err){
            throw err;
        }
        resp.redirect('/');
    });
})

app.get('/edit/:id', (req, resp) => {
    client.query(`SELECT * FROM axela_student WHERE student_id=${req.params.id}`, (err, res) => {
        var d = new Date(res.rows[0]['student_dob']).toISOString().
        replace(/T.+/, '') 
        resp.render('edit', { 'res' : res , 'id' : req.params.id, 'date' : d });
    });
});

app.post('/edit/:id', (req, resp) => {
    var active = false;
    if (req.body.activity == "on"){
        active = true;
    }
    var code = 1;
    if (req.body.course == "Python"){
        code = 2;
    }

    var d = new Date(req.body.dob).toISOString().
    replace(/T.+/, ' ') 
    client.query('UPDATE axela_student SET student_name=$1 , student_age=$2, student_dob=$3, student_mobile=$4, student_email=$5, student_address=$6, student_course_id=$7, student_active=$8 WHERE student_id = $9;', [req.body.name, req.body.age, d, req.body.mobile, req.body.email, req.body.address, code, active, req.params.id], (err, res) => {
        if(err) throw err;
        resp.redirect('/');
    });
});

var server = app.listen(port, function () {
    console.log(`\nPostgres Node server is running on port: ${server.address().port}`)
  }) 