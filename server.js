const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0.u7t8u.mongodb.net/demo?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3080, () => {
    MongoClient.connect(url, { useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({
    name: req.body.name, 
    quote: req.body.quote, 
    color: "black"
    // thumbUp: 0, 
    // thumbDown:0
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.put('/thumbUp', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, quote: req.body.quote}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.put('/thumbDown', (req, res) => {
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, quote: req.body.quote}, {
//     $set: {
//       thumbDown:req.body.thumbDown + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.put('/coloredChange', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({
    name: req.body.name, 
    quote: req.body.quote
  }, {
    $set: {
      color: "blue"
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({
    name: req.body.name, 
    quote: req.body.quote
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
