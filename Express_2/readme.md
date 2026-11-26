## 7-2: Understanding the express Request and Response

// import express module from express

1.  import express from "express";
2.  const app = express();
3.  const port = 3000;

// to run the express server in the port

4. app.listen(port, () => {
   console.log(`The app is running on port: ${port}`);
   });

// to show the response in the borwser throuth route router

5. app.get("/", (req, res) => {
   res.send(`This is root route `);
   });

// Add app varibale type as per typescript type

6. const app: Application = express();

//Add req and response type

7. app.get("/", (req: Request, res: Response) => {
   res.send(`This is root route `);
   });

//To show status code in json format using biltin status method of express server and borwser network tab

8. app.get("/", (req: Request, res: Response) => {
   //res.send(`This is root route `);
   res.status(200).json({
   success: true,
   message: "This is root route",
   author: "SIL",
   });
   });

// To show the request in console mode

9. app.get("/", (req: Request, res: Response) => {
   console.log(res);
   // res.send(`This is root route `); or Json format
   // res.status(200).json({
   success: true,
   message: "This is root route",
   author: "SIL",
   });
   });

// To show data in postman using post method

10. app.post("/", async (req: Request, res: Response) => {
    console.log(req.body);
    });
    Add Middleware to show the data using post method
    app.use(express.json()); // to show json data using request in post method
    app.use(express.text()); // to show the text data using post method
    app.use(express.urlencoded({ extended: true })); // to show the urlencoded data

11. const port = 5000; // change the port number

12. Postman API
    i. Create a folder in post man in the name of User
    ii. Create a request in the name: post http://localhost:5000

## 7-3: Setting Up Postgres with Neon Serverless Cloud

//to show data through body: Create post api and create a response in json format

1.  app.post("/", async (req: Request, res: Response) => {
    // console.log(req.body);
    const body = req.body;
    res.status(200).json({
    success: true,
    message: "This is a test api using post Method",
    data: body,
    });
    });

2.  i. Go to postman
    ii. create an url: http://localhost:5000
    iii. Select : body
    iv. Select : raw
    v. Select : {}JSON
    vi. Write Data:
    {
    "name" : "Mr. Md. Shahidul Islam",
    "email": "shahidulislam339898@gmail.com",
    "password": "564sdfsadfasfsdfsad",
    "age": 25
    }
    vii. Click on send
    viii. Result will show in json format with success status code
    {
    "success": true,
    "message": "This is a test api",
    "data": {
    "name": "Mr. Md. Shahidul Islam",
    "email": "shahidulislam339898@gmail.com",
    "password": "564sdfsadfasfsdfsad",
    "age": 25
    }
    }

// destructure the body data and show required data

3. app.post("/", async (req: Request, res: Response) => {
   // console.log(req.body);
   // const body = req.body;
   const { name, age, password } = req.body;
   console.log("Password: ", password); // this will show in console
   res.status(200).json({
   success: true,
   message: "This is a test api using post Method",
   data: { name, age }, // this will show in postman output
   });
   });

   Request send through post man
   {
   "name" : "Mr. Md. Shahidul Islam",
   "email": "shahidulislam339898@gmail.com",
   "password": "564sdfsadfasfsdfsad",
   "age": 25
   }

   Show data in outpur as per destructure
   {
   "success": true,
   "message": "This is a test api using post Method",
   "data": {
   "name": "Mr. Md. Shahidul Islam",
   "age": 25
   }
   }

4. Create connection with postgres (Connection local server with postgress neon server)
   i. install pg : npm i pg ( Go through web browsing)
   ii. install TS : npm install --save @types/pg
   iii. import pool from "pg";
   iv. Create a connection:
   const pool = new Pool({
   connectionString:
   "postgresql://neondb_owner:npg_cJbj6k0qOhGA@ep-twilight-silence-az0qr3em-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
   }); // copy from neon website connection
   console.log("Pool From Neon DB", pool); // to show the pool status in console

## 7-4: Explore SQL Data types

      Show the database data type from w3 schools

## 7-5: Executing Pool and creating tables

      // 7-5: Executing Pool and creating tables: Start

      const initDB = async () => {
      try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR (255),
      email VARCHAR (255) NOT NULL,
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

      // 7-5: Executing Pool and creating tables: End

## 7-6: Creating our first User with POST method

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

## 7-7: Getting All Users and Single user with params

      //_ 7-7: Getting All Users and Single user with params : Start
      //To get all users
      app.get("/api/v1/users", async (req: Request, res: Response) => {
      try {
      const result = await pool.query(`
      SELECT _ FROM users
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
      `       SELECT * FROM users
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

      //\* 7-7: Getting All Users and Single user with params : End

## 7-8: Update User with the PUT method : Start

      // 7-8: Update User with the PUT method : Start

      app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
      try {
      const { id } = req.params;
      const { name, password, age, is_Active } = req.body;

      const result = await pool.query(
            `
            UPDATE users
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_Active = COALESCE ($4, is_Active)
            WHERE id = $5  RETURNING *
      `,
            [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
      );
      // console.log(result);

      res.status(201).json({
            success: true,
            message: "User Information Updated Successfully !!",
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

// 7-8: Update User with the PUT method : End
