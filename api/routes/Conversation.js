import express from "express";
import {
  createConversation,
  getallConvo,
  alternateconvo,
  IndividualConvo,
} from "../controller/Conversation.js";
const router = express.Router();

router.post("/", createConversation);
router.post("/convo", getallConvo);
router.get("/:userId", alternateconvo);
router.get("/:userId/:friendId", IndividualConvo);

export default router;
