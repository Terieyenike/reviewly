const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const db = require('./db');

// const register = require('./controllers/register');

app.use(express.json());
app.use(cors());

/*
Possible schema for ReviewLy

*/

// home route
app.get('/', (req, res) => {
  res.json({
    message:
      "A platform where users can sign up with their basic information and post reviews about apartments they've previously lived in.",
    success: 'OK',
  });
});

app.get('/reviews', async (req, res) => {
  try {
    const allUser = await db.query('Select * from users');
    res.json(allUser.rows);
  } catch (error) {
    res.status(400).json('error displaying user reviews');
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    const newUser = await db.query(
      'INSERT INTO login(email, hash) VALUES($1, $2) RETURNING *',
      [email, hash]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(400).json('unable to register');
  }
});

app.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json('incorrect login details.');
    }
    db.query('SELECT email, hash FROM login WHERE email = $1', [email]).then(
      (data) => {
        const isValid = bcrypt.compareSync(password, data.rows[0].hash);
        console.log(isValid);
        if (isValid) {
          return db
            .query('SELECT * FROM users WHERE email = $1', [email])
            .then((user) => {
              res.json(user.rows[0].name);
            })
            .catch((err) => res.status(400).json('unable to get user'));
        } else {
          res.status(400).json('wrong credentials');
        }
      }
    );
  } catch (error) {
    res.status(400).json('invalid login details.');
  }
});

app.post('/reviews', async (req, res) => {
  try {
    const {
      name,
      email,
      apartment_lived_in,
      landlords,
      apartment_situated,
      quality_of_apartment,
    } = req.body;
    if (!name || !email) {
      res
        .status(400)
        .json('Please check your details. Input the right details');
    }
    const reviews = await db.query(
      'insert into users (name, email, apartment_lived_in, landlords, apartment_situated, quality_of_apartment) values($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        name,
        email,
        apartment_lived_in,
        landlords,
        apartment_situated,
        quality_of_apartment,
      ]
    );
    res.json(reviews.rows[0]);
  } catch (error) {
    res.status(400).json('no user reviews');
  }
});

app.get('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const singleReview = await db.query('select * from users where id = $1', [
      id,
    ]);
    res.json(singleReview.rows[0]);
  } catch (error) {
    res.status(400).json('no single review by user.');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Port running on port:${PORT}`);
});
