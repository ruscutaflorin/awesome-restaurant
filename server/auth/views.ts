import { Request, Response } from "express";
import { loginService, registerService } from "./services/user";
import { validationResult } from "express-validator";

export async function loginView(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);

    return res.status(501).json(err.message);
  }
}

export async function registerView(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const user = await registerService(userData);
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(501).json(err.message);
  }
}
