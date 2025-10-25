import express from "express";
import {
  addMember,
  createGroup,
  getGroup,
  getMembers,
} from "../controllers/group.controller.js";
import { addExpense, getExpense } from "../controllers/expense.controller.js";
import {
  computeSettlements,
  getSettlements,
  settleSettlement,
} from "../controllers/settlement.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, createGroup);
router.get("/get", authMiddleware, getGroup);
router.post("/add/:id", authMiddleware, addMember);
router.get("/members/:id", authMiddleware, getMembers);
router.post("/expense/add/:id", authMiddleware, addExpense);
router.get("/expense/get/:id", authMiddleware, getExpense);
router.post("/settlements/compute/:id", authMiddleware, computeSettlements);
router.get("/settlements/get/:id", authMiddleware, getSettlements);
router.post("/settlements/settle/:id", authMiddleware, settleSettlement);

export default router;
