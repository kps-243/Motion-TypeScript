import { Request, Response } from "express";
import * as practiceService from "../services/practice";
import { Types } from "mongoose";


// CREATE
export const createPractice = async (req: Request, res: Response) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.auth!.userId,
    };

    const practice = await practiceService.createPractice(data);
    res.status(201).json({ message: "Exercice créé", practice });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
export const getAllPractices = async (req: Request, res: Response) => {
  try {
    const practices = await practiceService.getAllPractices();

    res.status(200).json(practices);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// GET ONE
export const getOnePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    const practice = await practiceService.getOnePractice(id);
    if (!practice) {
      return res.status(404).json({ message: "Exercice non trouvé" });
    }

    res.status(200).json(practice);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
export const modifyPractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    const practice = await practiceService.modifyPractice(id, req.body);
    if (!practice) {
      return res.status(404).json({ message: "Exercice non trouvé" });
    }

    res.status(200).json(practice);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE
export const deletePractice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id manquant" });
    }

    const deleted = await practiceService.deletePractice(id);
    if (!deleted) {
      return res.status(404).json({ message: "Exercice non trouvé" });
    }

    res.status(200).json({ message: "Exercice supprimé" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

