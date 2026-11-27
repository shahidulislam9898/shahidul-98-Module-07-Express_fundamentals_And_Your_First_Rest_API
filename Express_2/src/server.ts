import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = async () => {
  //* Database Initialize
  initDB();
  //? Lister the app on console
  app.listen(config.port, () => {
    console.log(`The app is running on port: ${config.port}`);
  });
};

main();
