import express from "express";
import {
  insert,
  login,
  updateTask,
  getAllUser,
} from "../Controllers/User.controller.js";

const router = express.Router();

router.post("/insert", insert);
router.post("/login", login);
router.post("/updateNewTask", updateTask);
router.get("/getAllUser", getAllUser);

export default router;
