// import { Pool } from "pg";
// import express, {
//   type Application,
//   type Request,
//   type Response,
// } from "express";

// const app: Application = express(); //Initialized the app
// const port = 5000; // initialized the app at port 3000

// //builtin middleware of express
// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));

// const pool = new Pool({
//   connectionString:
//     "postgresql://neondb_owner:npg_cJbj6k0qOhGA@ep-twilight-silence-az0qr3em.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
// });
// // console.log("Database Neon PG Import pool: ", pool);

// app.get("/", (req: Request, res: Response) => {
//   // console.log(req);
//   // res.send("Hello express: This is root route");
//   res.status(200).json({
//     success: true,
//     message: "This is root route: Using GET Method",
//     author: "SIL",
//   });
// });

// app.post("/", async (req: Request, res: Response) => {
//   // const body = req.body;
//   const { name, age, password } = req.body;
//   res.status(200).json({
//     success: true,
//     message: "User is created: this is a test post api",
//     data: { name, age },
//   });
//   // console.log("Password: ", password);
// });

// //run the app on port 3000
// app.listen(port, () => {
//   console.log(`Express Server is running at Port: ${port}`);
// });

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express();
// const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);

//*Default Browser Server
app.get("/", (req: Request, res: Response) => {
  // console.log(res);
  // res.send(`This is root route `); or Json format
  res.status(200).json({
    success: true,
    message: "This is root route: Default Browser",
    author: "SIL",
  });
});

export default app;
