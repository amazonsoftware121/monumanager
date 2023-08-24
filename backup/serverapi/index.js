const  express = require("express");
const app = express();
const customerRoutes = require("./routes/customers.js");
const carvingRoutes = require("./routes/carvings.js");
const authRoutes = require("./routes/auth.js");
const jobRoutes = require("./routes/jobs.js");
const searchRoutes = require("./routes/search.js");
const taskRoutes = require("./routes/tasks.js");
const productRoutes = require("./routes/products.js");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const hostname = 'granitx.com';
const port = 3000;

// MIDDELWARE

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
//can't wait to see it run on a different server!! (Portable!)- :)

  // Define an array of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://granitx.com"
  // Add more origins as needed
];

// Configure cors middleware with the allowed origins
app.use(cors({
  origin: allowedOrigins,
}));

  app.use(cookieParser());
  
app.get("/monumanagerapi", (req,res)=>{
  res.send("API Working");
})

// Add a response for the home URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.use("/monumanagerapi/api/auth", authRoutes);
app.use("/monumanagerapi/api/customers", customerRoutes);
app.use("/monumanagerapi/api/search", searchRoutes);
app.use("/monumanagerapi/api/jobs", jobRoutes);
app.use("/monumanagerapi/api/carvings", carvingRoutes);
app.use("/monumanagerapi/api/tasks", taskRoutes);
app.use("/monumanagerapi/api/products", productRoutes);

//app.use(express.static('/uploads/products'));
app.use('/monumanagerapi/static', express.static('uploads/products'))



// email code start

app.post('/monumanagerapi/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using your Gmail account details
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'amsdfhgsitd.amaron@gmail.com',
      pass: 'myvhpldxzxdczxcfastdxbu',
    /*Nice choice of code. If this is done correcty, then theoretically it
	could be used throuout the site?*/
    },
  });

  const mailOptions = {
    from: 'we3rv@gmrwtail.com',
    to: ' wfharbca1990@gmdwail.com',
    subject: 'New Email from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// email code End


app.listen(port, hostname, () =>{
    console.log(`Server (aaa) running at http://${hostname}:${port}/`);
})







/*
const express = require('express');
const app = express();

const hostname = 'granitx.com';
const port = 3000;

app.get('/', (req, res) => {
  res.send('Helloaaa World!');
});

app.listen(port, hostname, () => {
  console.log(`Server aaarunning at http://${hostname}:${port}/`);
});
*/