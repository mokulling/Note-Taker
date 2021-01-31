var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

var PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//visible routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf-8', function(err, json) {
    if (err) throw err;
    var array = JSON.parse(json);
    array.push(req.body)
    fs.writeFile('db/db.json', JSON.stringify(array), function(err) {
      if (err) throw err;
      return;
    })
  })
  //console.log(req.body)
  



})


//api routes
app.get('/api/notes', (req,res) => {
    console.log(res)
});

app.delete('/api/notes', (req, res) => {
    console.log('this will be deleted')
});

app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, './public/assets/js/index.js'))

})







//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  