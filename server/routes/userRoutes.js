import express from "express";
import { getUsers, createUser, authUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/testrouter", (req, res) => {
    res.send("User router test route working!");
});

router.route("/").get(getUsers).post(createUser);

// New login route
router.post("/login", authUser);

export default router;