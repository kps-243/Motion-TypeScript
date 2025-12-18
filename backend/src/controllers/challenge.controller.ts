import { Request, Response } from "express";
import * as challengeService from "../services/challenge";
import { Types } from "mongoose";


export const createChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await challengeService.createChallenge({
      ...req.body,
      createdBy: new Types.ObjectId(req.auth!.userId),
    });

    res.status(201).json(challenge);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllChallenges = async (_req: Request, res: Response) => {
  try {
    const challenges = await challengeService.getAllChallenges();
    res.status(200).json(challenges);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const getOneChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    const challenge = await challengeService.getOneChallenge(id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge non trouvé" });
    }

    res.status(200).json(challenge);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Modifier un challenge
 */
export const modifyChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    await challengeService.modifyChallenge(id, req.body);

    res.status(200).json({ message: "Challenge modifié !" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Supprimer un challenge
 */
export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    await challengeService.deleteChallenge(id);

    res.status(200).json({ message: "Challenge supprimé !" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Compléter un challenge
 */
export const completeChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    const challenge = await challengeService.completeChallenge(
      id,
      new Types.ObjectId(req.auth!.userId)
    );

    if (!challenge) {
      return res.status(404).json({ message: "Challenge non trouvé" });
    }

    res.status(200).json({
      message: "Challenge complété",
      challenge,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
