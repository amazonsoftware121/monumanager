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


// MIDDELWARE

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3000","https://monumanager.amaronsoftware.com","http://monumanager.amaronsoftware.com"],
    })
  );
  app.use(cookieParser());
  
app.get("/monumanagerapi", (req,res)=>{
  res.send("API Working");
})
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
      user: 'amitd.amaron@gmail.com',
      pass: 'myvhpldxfastdxbu',
    },
  });

  const mailOptions = {
    from: 'amitkumarbca1990@gmail.com',
    to: 'amitkumarbca1990@gmail.com',
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

app.listen(5000, () =>{
    console.log("Api Working")
})