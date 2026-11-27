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

// update user
const updateUserFromDB = async (payLoad: any, id: string) => {
  const { name, password, age, is_Active } = payLoad;

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
  return result;
};

const deleteUserFromDB = async (payLoad: any, id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id = $1
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
  updateUserFromDB,
  deleteUserFromDB,
};
