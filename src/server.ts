import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

async function main() {
  await mongoose.connect(config.database_url as string);

  server = app.listen(config.port, () => {
    console.log(
      `Car Wash Booking System Server Is Running On Port: ${config.port}`
    );
  });
}

main();

// process.on("unhandledRejection", () => {
//   console.log("unhandledRejection is detected, shutting down server...");
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on("uncaughtException", () => {
//   console.log("uncaughtException is detected, shutting down server...");

//   process.exit(1);
// });
