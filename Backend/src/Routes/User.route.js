import express from "express";
import { insert } from '../Controllers/User.controller.js';

const router = express.Router();

router.post('/insert', insert);

export default router