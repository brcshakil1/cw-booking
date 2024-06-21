import Router from "express";
import { SlotsController } from "./slot.controller";

const router = Router();

router.get("/availability", SlotsController.getAllSlot);

export const SlotRouters = router;
