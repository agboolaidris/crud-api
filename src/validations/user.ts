import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";

function validateDate(input: string) {
  var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (input.match(reg)) {
    return true;
  } else {
    return false;
  }
}

export const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, first_name, date_of_birth } = req.body;

    const errors: any = {};
    if (!username || username.trim() == "")
      errors.username = "username is required";

    if (!first_name || first_name.trim() == "")
      errors.first_name = "first_name is required";

    if (!date_of_birth || date_of_birth.trim() == "")
      errors.date_of_birth = "date_of_birth is required";

    if (Object.keys(errors).length > 0) return res.status(401).json({ errors });

    const validateUsername = await User.findOne({ username });

    if (validateUsername) errors.username = "username already exist";
    if (!validateDate(date_of_birth))
      errors.date_of_birth = "date_of_birth must be in DD-MM-YYYY format";

    if (Object.keys(errors).length > 0) return res.status(401).json({ errors });

    next();
  } catch (error: any) {
    return res.status(400).json({ errors: error.message });
  }
};
