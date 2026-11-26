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

import { Pool } from "pg";

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_cJbj6k0qOhGA@ep-twilight-silence-az0qr3em-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});
// console.log("Pool From Neon DB", pool);

//* 7-5: Executing Pool and creating tables: Start
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name VARCHAR (255),
        email VARCHAR (255) UNIQUE NOT NULL,  
        password VARCHAR(255) NOT NULL,
        age INT, 

        is_Active BOOLEAN DEFAULT true, 
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

      )
      
    `);
    console.log("Database Connected: Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};

initDB();
//* 7-5: Executing Pool and creating tables: End

app.get("/", (req: Request, res: Response) => {
  // console.log(res);
  // res.send(`This is root route `); or Json format
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "SIL",
  });
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    // const body = req.body;
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
    INSERT INTO users (name, email, password, age) VALUES 
    ($1, $2, $3, $4) RETURNING *
  `,
      [name, email, password, age],
    );
    // console.log(result);
    // console.log("Password: ", password);

    res.status(201).json({
      success: true,
      message: "User Created Successfylly!!",
      // data: { name, age },
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      sussess: false,
      message: error?.message,
      error: error,
    });
  }
});

//* 7-7: Getting All Users and Single user with params : Start
//To get all users
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
     SELECT * FROM users 
    `);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Users Retrive Successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

// To get single user
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT * FROM users 
      WHERE id = $1
      `,
      [id],
    );
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Single User Retrive Successfylly!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

//* 7-7: Getting All Users and Single user with params : End

app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
