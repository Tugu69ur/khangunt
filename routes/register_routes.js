import express from "express";
const router = express.Router();

import {
  register
} from "../controller/register_controller.js";

router.route("/").post(register);

export default router;
