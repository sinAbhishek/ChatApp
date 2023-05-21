import express from "express";
import { getmessage, sendmessage } from "../controller/Message.js";

const router = express.Router();

router.post("/", sendmessage);
router.get("/:conversationId", getmessage);

export default router;
