import { createChat } from '../controllers/chatController.js';

import express from 'express';
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/chat/new").post(isAuthenticatedUser, createChat);

export default router;