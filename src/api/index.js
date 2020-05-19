const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

/** Back-end **/
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

// Middleware to use for all requests
router.use((req, res, next) => {
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'EmojiLovers API' });
});

// Get all emojis
router.route('/emojis').get((req, res) => {
  return res.json(emojis);
});

// Get emoji by id
router.route('/emoji/:id').get((req, res) => {
  const id = req.params.id;

  if (!emojis[id]) {
    return res.status(404).json({ error: 'Emoji not found' });
  }

  return res.json(emojis[id]);
});

// Get all country codes
router.route('/countryCodes').get((req, res) => {
  return res.json(countryCodes);
});

MongoClient.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db('users');
    const usersCollection = db.collection('data');

    // Catch user data and save mongodb database
    router.route('/user/catch').post((req, res) => {
      usersCollection
        .insertOne(req.body)
        .then((result) => {
          res.json({ _id: result.ops[0]._id });
        })
        .catch((error) => {
          console.error(error);
        });
    });

    // Update user data and save mongodb database
    router.route('/user/update/:id').put((req, res) => {
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

    router.route('/user/:id').get((req, res) => {
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

// Routes will be prefixed with /api
app.use('/api', router);

/** Front-end **/
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../../build')));

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

// Start
app.listen(process.env.BACK_PORT, () => {
  console.log(`back-end listening on port ${process.env.BACK_PORT}`);
});
