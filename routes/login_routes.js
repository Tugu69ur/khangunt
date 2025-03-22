import express from "express";
const router = express.Router();

import { login } from "../controller/login_controller.js";

router.route("/").post(login);

export default router;
