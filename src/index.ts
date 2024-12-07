import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import analyticsRoute from "./routes/analytics/analytics.route";
import productsRoute from "./routes/products/products.route";
import * as mongoose from "mongoose";


dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_CLUSTER:string = process.env.MONGODB_CLUSTER!
app.use(cors());
app.use(express.json())
app.use(cookieParser());




app.use("/analytics", analyticsRoute)

app.use("/products", productsRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});


mongoose.connect(MONGODB_CLUSTER).then(()=> {
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.error(err)
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
