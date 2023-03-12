import express, {Request, Response} from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from 'cors';
import Test from "./models/Test";

config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req: Request,res: Response) => {
    res.send("Customer onboarding service running")
})

app.post("/add", async (req: Request, res: Response) => {
    const newTest = new Test({
        test : req.body.test
    })
    const createdTest = await newTest.save();
    res.json(createdTest);
})


mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
})