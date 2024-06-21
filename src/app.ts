import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Car Wash Booking System's Server Is Running...");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

// global routes handling
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "This route not found",
  });
});

export default app;
