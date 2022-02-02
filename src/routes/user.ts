import { Router, Response, Request } from "express";
import { userValidation } from "../validations/user";
import { User } from "../model/user";
const route = Router();

route.get("/users", async (_, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

route.post("/user", [userValidation], async (req: Request, res: Response) => {
  try {
    const { username, first_name, last_name, date_of_birth } = req.body;

    const name_prefix = `${first_name.charAt(0).toUpperCase()}${
      last_name ? last_name.charAt(0).toUpperCase() : ""
    }`;

    const user = new User({
      username,
      first_name,
      last_name,
      date_of_birth,
      name_prefix,
    });

    const response = await user.save();

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

route.delete("/user/:username", async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({
      username: req.params.username,
    });

    if (!user) return res.status(404).json({ error: "username doesn't exist" });
    return res.json({ message: "You deleted the user successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default route;
