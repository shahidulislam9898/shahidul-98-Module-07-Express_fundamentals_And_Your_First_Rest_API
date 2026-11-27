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

export const userController = {
  createUser,
};
