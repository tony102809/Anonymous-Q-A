import './config.mjs'

import express from 'express';
import mongoose from 'mongoose'; // Import mongoose

// Import the db.mjs file to execute database-related code
import './db.mjs';

const app = express();

// set up express static
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// Retrieve the model registered with mongoose
const Review = mongoose.model('Review');

app.get('/', async (req, res) => {
  const filter = {};
  let needFilter = false;

  if (req.query.semester) {
    filter.semester = req.query.semester;
    needFilter = true;
  }
  if (req.query.year) {
    filter.year = req.query.year;
    needFilter = true;
  }
  if (req.query.professor) {
    filter.professor = req.query.professor; 
    needFilter = true;
  }

  try {
    if (needFilter) {
      const reviews = await Review.find(filter);
      res.render('reviews', { reviews });
    } else {
      const reviews = await Review.find();
      res.render('reviews', { reviews });
    }
  } catch (error) {
    res.render('error', { error });
  }
});

//Part 4: Adding a Review
app.get('/reviews/add', (req, res) => {
  res.render('addReview'); 
});

app.post('/reviews/add', (req, res) => {
  const c = new Review({
    courseNumber: req.body.courseNumber,
    courseName: req.body.courseName,
    semester: req.body.semester,
    year: req.body.year,
    professor: req.body.professor,
    review: req.body.review
  });

   c.save()
     .then(savedReview => res.redirect('/'))
     .catch(err => res.status(500).send('server error'));

});


app.listen(process.env.PORT || 3000);
