import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Car Wash Booking System's Server Is Running...");
});

export default app;
