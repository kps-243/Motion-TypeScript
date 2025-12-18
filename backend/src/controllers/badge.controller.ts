import { Request, Response } from "express";
import { Types } from "mongoose";
import * as badgeService from "../services/badge.service";

export const createBadge = async (req: Request, res: Response) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const data = {
      ...req.body,
      createdBy: new Types.ObjectId(req.auth.userId),
    };

    const badge = await badgeService.createBadge(data);
    return res.status(201).json({ message: "Badge créé", badge });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllBadges = async (_req: Request, res: Response) => {
  try {
    const badges = await badgeService.getAllBadges();
    return res.status(200).json(badges);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getOneBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const badge = await badgeService.getOneBadge(id);
    if (!badge) return res.status(404).json({ message: "Badge non trouvé" });

    return res.status(200).json(badge);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const modifyBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const badge = await badgeService.modifyBadge(id, req.body);
    if (!badge) return res.status(404).json({ message: "Badge non trouvé" });

    return res.status(200).json(badge);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id manquant" });

    const deleted = await badgeService.deleteBadge(id);
    if (!deleted) return res.status(404).json({ message: "Badge non trouvé" });

    return res.status(200).json({ message: "Badge supprimé" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMyBadges = async (req: Request, res: Response) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const badges = await badgeService.getBadgesForUser(req.auth.userId);
    return res.status(200).json(badges);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
