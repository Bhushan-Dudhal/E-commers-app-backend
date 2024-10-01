import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { database } from "./data/database.js";
import routes from "./routes/user.routes.js";
import { errorMiddlewares } from "./middlewares/error.middlewars.js";
const app = express();
import cloudinary from "cloudinary"
import productRoutes from "./routes/product.routes.js";
config({ path: "./config/.env" });

//MIddlewares
database();
app.use(express.json());
app.use(cookieParser());
cloudinary.v2.config({
    cloud_name: process.env.KEY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


//Routes

app.use("/api/user",routes)
app.use("/api/product", productRoutes)


//Server
app.use(errorMiddlewares)
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
    
})