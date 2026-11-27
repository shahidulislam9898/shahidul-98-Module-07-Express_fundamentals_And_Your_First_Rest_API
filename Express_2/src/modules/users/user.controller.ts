import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    // console.log(result);
    // console.log("Password: ", password);
    const result = await userService.createUserIntoDB(req.body);

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
};

// To Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
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
};

export const userController = {
  createUser,
  getAllUsers,
};
