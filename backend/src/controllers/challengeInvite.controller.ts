// src/controllers/challengeSocial.controller.ts
import { Request, Response } from "express";
import * as socialService from "../services/challengeInvite";

// Si tu n’as pas encore typé req.auth globalement, ce petit type local suffit
type AuthRequest = Request & {
  auth?: {
    userId: string;
    role?: string;
  };
};

export const invite = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params; // challengeId
    const fromUserId = req.auth?.userId;
    const { toUserId, message } = req.body as { toUserId?: string; message?: string };

    if (!fromUserId) return res.status(401).json({ message: "Non authentifié" });
    if (!id) return res.status(400).json({ message: "challengeId manquant" });
    if (!toUserId) return res.status(400).json({ message: "toUserId manquant" });

    const invite = await socialService.inviteToChallenge({
      challengeId: id,
      fromUserId,
      toUserId,
      message,
    });

    return res.status(201).json({ message: "Invitation envoyée", invite });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const myInvites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ message: "Non authentifié" });

    const invites = await socialService.getMyInvites(userId);
    return res.status(200).json(invites);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const respond = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { inviteId } = req.params;
    const { action } = req.body as { action?: "ACCEPT" | "DECLINE" };

    if (!userId) return res.status(401).json({ message: "Non authentifié" });
    if (!inviteId) return res.status(400).json({ message: "inviteId manquant" });
    if (!action) return res.status(400).json({ message: "action manquante (ACCEPT/DECLINE)" });

    const invite = await socialService.respondToInvite({
      inviteId,
      userId,
      action,
    });

    return res.status(200).json({ message: "Réponse enregistrée", invite });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const cancel = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { inviteId } = req.params;

    if (!userId) return res.status(401).json({ message: "Non authentifié" });
    if (!inviteId) return res.status(400).json({ message: "inviteId manquant" });

    const invite = await socialService.cancelInvite({
      inviteId,
      userId,
    });

    return res.status(200).json({ message: "Invitation annulée", invite });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
