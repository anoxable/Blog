const express = require('express');
const app = express();
const mysql = require('mysql')
var bodyParser = require('body-parser');

//Connect To Database
const db = mysql.createConnection({
    host:'localhost',
    user:'anox',
    password:'albatros',
    database:'blog'
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
    const sql='SELECT * FROM post';

    db.query(sql,(err,posts)=>{
        if(err) throw err;
        res.render('index',{posts:posts});
    })
 });

//Admin area
app.get("/admin",(req,res)=>{
    res.render('adminLogin')
})
app.post("/admin",(req,res)=>{
    var username=req.username;
    var password=req.password;
})
 app.post('/addpost', (req, res) => {
    var postTitle = req.title
    var postBody = req.body
    console.log(postBody)
    const sql=`INSERT INTO post (title,body) values ("${postBody.title}","${postBody.body}");`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect('/')
    })
});

app.listen(4000,()=>{
    console.log('Server Started')
})