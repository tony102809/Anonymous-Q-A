import './config.mjs'; 
import mongoose from 'mongoose';

// define the data in our collection
// Define the Review schema
const Review = new mongoose.Schema({
    courseNumber: String,
    courseName: String,
    semester: String,
    year: Number,
    professor: String,
    review: String,
});
  

// "register" it so that mongoose knows about it
mongoose.model('Review', Review);

// Uncomment following line to debug the value of the database connection string
console.log(process.env.DSN);
mongoose.connect(process.env.DSN); 