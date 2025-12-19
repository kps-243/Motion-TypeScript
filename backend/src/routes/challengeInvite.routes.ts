import { Router } from "express";
import auth from "../middlewares/auth";
import * as socialCtrl from "../controllers/challengeInvite.controller";

const router = Router();

router.post("/challenge/:id/invite", auth, socialCtrl.invite);
router.get("/invites/me", auth, socialCtrl.myInvites);
router.post("/invites/:inviteId/respond", auth, socialCtrl.respond);
router.post("/invites/:inviteId/cancel", auth, socialCtrl.cancel);

export default router;
