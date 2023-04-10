const  express = require("express");
const app = express();
const customerRoutes = require("./routes/customers.js");
const authRoutes = require("./routes/auth.js");
const jobRoutes = require("./routes/jobs.js");
/*const carvingRoutes = require("./routes/carvings.js");
const productRoutes = require("./routes/products.js");
const taskRoutes = require("./routes/tasks.js");*/
const cors = require('cors');
const cookieParser = require('cookie-parser');

// MIDDELWARE

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());
  
app.get("", (req,res)=>{
  res.send("Hello");
})
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/jobs", jobRoutes);
/*app.use("/api/carvings", carvingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tasks", taskRoutes);*/

app.listen(4500, () =>{
    console.log("Api Working")
})