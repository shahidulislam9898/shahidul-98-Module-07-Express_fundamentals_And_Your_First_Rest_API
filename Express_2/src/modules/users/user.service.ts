import { pool } from "../../db";
import type { IUser } from "./user.interface";

//Create user
const createUserIntoDB = async (payLoad: IUser) => {
  // console.log(req.body);
  // const body = req.body;
  const { name, email, password, age } = payLoad;

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, age) VALUES 
    ($1, $2, $3, $4) RETURNING *
  `,
    [name, email, password, age],
  );
  //   console.log(result)
  return result;
};

//To get all users from db
const getAllUsersFromDB = async () => {
  const result = await pool.query(`
     SELECT * FROM users 
    `);
  return result;
};

// to get single user from db
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users 
      WHERE id = $1
      `,
    [id],
  );
  return result;
};

//Export
export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
