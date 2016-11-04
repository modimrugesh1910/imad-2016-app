var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'modimrugesh1910',
    database: 'modimrugesh1910',
    host: 'db.imad.hasura-app.io',
    port: '8080',
    password: process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));

var articles = { 
    'article-one' : {
        title: 'Article One ',
        heading: 'Article One',
        date: 'Oct 7, 2016',
        content: `
            <p>
                This is my first article. This is my first article. This is my first article. This is my first article. This is my first article.This is my first article. This is my first article. This is my first article. This is my first article. 
            </p>
            <p>
                This is my first article. This is my first article. This is my first article. This is my first article. This is my first article.This is my first article. This is my first article. This is my first article. This is my first article. 
            </p>
            <p>
                This is my first article. This is my first article. This is my first article. This is my first article. This is my first article.This is my first article. This is my first article. This is my first article. This is my first article. 
            </p>`
    }
};

function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = ` 
    <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr />
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/ui/index.php', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.php'));
});

app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/ui/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/article1.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article1.html'));
});

app.get('/ui/article2.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});

app.get('/ui/article3.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article3.html'));
});

var pool = new Pool(config);
app.get('/', function (req, res) {
    // make a select request
    // return a responce with the results
    
    pool.query('SELECT * FROM test', function(err, result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.Stringify(result, rows));
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.scss'));
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/:articleName', function(req, res) {
    // articleName === article-one
    // articles[articleName] === {} content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var names = [];
app.get('/submit-name', function(req, res) { // URL: /submit-name?name-xxxxxx
    // get the name from the request
    var name = req.params.name;
    names.push(name);
    // JSON - JavaScript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
