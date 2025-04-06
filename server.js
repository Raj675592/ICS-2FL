const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 5501;
require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas URI (replace <username>, <password>, <cluster>, and <dbname> with actual values)
const MONGO_URI = process.env.MONGO_URI ;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollno: String,
  feedback: String,
  rating: Number,
  isAnonymous: Boolean
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Appointment schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  date: Date,
  time: String,
  service: String,
  message: String
});
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // For appointment form
});

app.get('/review', (req, res) => {
  res.sendFile(path.join(__dirname, 'index1.html')); // For feedback form
});

app.post('/appointment', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  console.log(appointment);
  res.send(`
    <html><body style="text-align:center; font-family:sans-serif; margin-top:50px;">
    <h2>✅ Appointment submitted successfully!</h2>
    <p>Redirecting to homepage...</p>
    <script>setTimeout(() => { window.location.href = "/" }, 3000);</script>
    </body></html>
  `);
});

app.post('/feedback', async (req, res) => {
  const feedback = new Feedback({
    ...req.body,
    isAnonymous: req.body.isAnonymous === 'on'
  });
  await feedback.save();
  console.log(feedback);
  res.send(`
    <html><body style="text-align:center; font-family:sans-serif; margin-top:50px;">
    <h2>✅ Feedback submitted successfully!</h2>
    <p>Redirecting to review page...</p>
    <script>setTimeout(() => { window.location.href = "/review" }, 3000);</script>
    </body></html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
