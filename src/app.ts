import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Car Wash Booking System's Server Is Running...");
});

export default app;
