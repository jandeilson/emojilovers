const express = require('express');
const dotenv = require('dotenv');

/** Back-end **/

const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

// static jsons
const { emojis } = require('./static/emojis');
const { countryCodes } = require('./static/countryCodes.js');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross-origin requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept'
  );

  next();
});

// get all emojis data
app.get('/emojis', (req, res) => {
  return res.json(emojis);
});

// get all country codes data
app.get('/countryCodes', (req, res) => {
  return res.json(countryCodes);
});

app.get('/emoji/:id', (req, res) => {
  // To prevent the ID '0' we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
  const id = req.params.id - 1;

  if (!emojis[id]) {
    return res.status(404).json({ error: 'Emoji not found' });
  }

  return res.json(emojis[id]);
});

// mongodb connect
MongoClient.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db('users');
    const usersCollection = db.collection('data');

    // catch user data and save mongodb database
    app.post('/catch', (req, res) => {
      usersCollection
        .insertOne(req.body)
        .then((result) => {
          res.json({ _id: result.ops[0]._id });
        })
        .catch((error) => {
          console.error(error);
        });
    });

    // update user data and save mongodb database
    app.put('/update/:id', (req, res) => {
      const id = req.params.id;

      usersCollection
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          {
            $set: {
              'user.loverPhone': req.body.loverPhone,
            },
          }
        )
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          return res.json({ error: error });
        });

      res.end();
    });

    app.get('/lover/:id', (req, res) => {
      const id = req.params.id;

      usersCollection
        .findOne(ObjectId(id))
        .then((result) => {
          if (result._id !== id) return res.json(result);
        })
        .catch((error) => {
          return res.json({ error: 'User not found.' });
        });
    });
  })
  .catch((error) => console.error(error));

app.listen(process.env.BACK_PORT, () => {
  console.log(`back-end listening on port ${process.env.BACK_PORT}`);
});

/** Front-end **/
const frontEnd = express();
const path = require('path');

frontEnd.use(express.static(__dirname));
frontEnd.use(express.static(path.join(__dirname, '../../build')));

frontEnd.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

frontEnd.listen(process.env.FRONT_PORT, () => {
  console.log(`front-end listening on port ${process.env.FRONT_PORT}`);
});
