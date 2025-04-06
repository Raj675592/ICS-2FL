const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 5501;


const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));


// mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('MongoDB connected')
// }).catch(err => {
//     console.error('MongoDB connection error:', err)
// })


mongoose.connect('mongodb://127.0.0.1:27017/appointment')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB')
})





// mongoose.connect('mongodb://127.0.0.1:27017/feedback', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('MongoDB connection error:', err);
// });















// new mongoose.Schema({
//     name: String,
//     email: String,

//     feedback: String
// })  


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



// Create a model based on the schema





// app.get('/feedbacks', async (req, res) => {
//     try {
//       const feedbacks = await Feedback.find(); // Get all feedback documents
//       res.json(feedbacks); // Send them as JSON
//     } catch (error) {
//       console.error('Error fetching feedback:', error);
//       res.status(500).send('Error fetching feedback');
//     }
//   });
  


app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});


app.post('/post', async (req, res) => {
    const appointment = new Appointment({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time,
        service: req.body.service,
        message: req.body.message

    });

    await appointment.save();
    console.log(appointment);
    // res.redirect('/');
    // res.send('Form Submission Successful, redirecting to home page');
    res.send(`
        <html>
          <head>
            <title>Form Submitted</title>
          </head>
          <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h2>✅ Your form has been submitted successfully!</h2>
            <p>You will be redirected to the homepage in 3 seconds...</p>
      
            <script>
              setTimeout(() => {
                window.location.href = "/";
              }, 3000); // 3000 ms = 2 seconds
            </script>
          </body>
        </html>
      `);
      
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})