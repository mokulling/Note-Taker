var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const file = path.join(__dirname, "./db/db.json");


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Math.floor(Math.random() * 100)

  fs.readFile('db/db.json', 'utf-8', function(err, json) {
    if (err) throw err;
    var array = JSON.parse(json);
    array.push(req.body)
    fs.writeFile('db/db.json', JSON.stringify(array), function(err) {
      if (err) throw err;
      
    })
  })
  //console.log(req.body)
  
  res.status(200).send();

 


})


//api routes
app.get('/api/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))


  })
;



app.delete("/api/notes/:id", (req,res) => {
    
  const noteId = req.params.id    

  const notes = readNotes(file);
  
  let i = 0;
  notes.every(element => {
      if (element.id == noteId)
          return false;            
      else
          i++;    
      return true;                    
  });

  notes.splice(i, 1);


  fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
          console.log(err);
          res.status(500).send();
      }
  })

  res.status(200).send();

})



function readNotes(file) {
  try {
      const data = fs.readFileSync(file, { encoding: "ascii", flag: "r" });

      var notes = JSON.parse(data);

  } catch (err) {
      console.error(err);
  }

  return(notes)
}


    //console.log(req.body)
    



app.get('/assets/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, './public/assets/js/index.js'))

})







//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
