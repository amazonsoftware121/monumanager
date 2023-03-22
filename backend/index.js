import express from "express";
const app = express();
import customerRoutes from "./routes/customers.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import carvingRoutes from "./routes/carvings.js";
import productRoutes from "./routes/products.js";
import taskRoutes from "./routes/tasks.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

// MIDDELWARE

app.use(express.json())
app.use(cors())
app.use(cookieParser)

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/carvings", carvingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(8800, () =>{
    console.log("Api Working")
})