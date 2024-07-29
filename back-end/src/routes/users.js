import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { name, password, username, image } = req.body;
    const newUser = await createUser(username, name, password, image);
    res.status(201).send({
      message: `Account succesfully created`,
      newUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} was not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser || deletedUser.count === 0) {
      res.status(404).json({
        message: `User with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, username, image } = req.body;
    const user = await updateUserById(id, { name, password, username, image });

    if (!user || user.count === 0) {
      res.status(404).json({
        message: `User with id ${id} was not found`,
      });
    } else {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
