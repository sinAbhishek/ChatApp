import express from "express";
import {
  addfriend,
  Login,
  Register,
  getuser,
  Alluser,
  addFriendRequest,
  addPending,
  addnew,
  removeFriendRequest,
  removePending,
  removefriend,
} from "../controller/Auth.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.put("/:userid/:friendid", addfriend);
router.put("/remove/:userid/:friendid", removefriend);
router.get("/:userid", getuser);
router.get("/", Alluser);
router.put("/pending/:userid/:friendid", addPending);
router.put("/request/:userid/:friendid", addFriendRequest);
router.put("/removepending/:userid/:friendid", removePending);
router.put("/removerequest/:userid/:friendid", removeFriendRequest);
router.put("/", addnew);

export default router;
