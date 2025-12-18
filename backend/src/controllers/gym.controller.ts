import { Request, Response } from "express";
import * as gymService from "../services/gym";

export const createGym = async (req: Request, res: Response) => {
  try {
    const gym = await gymService.createGym(req.body);
    res.status(201).json(gym);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGyms = async (req: Request, res: Response) => {
  try {
    const gyms = await gymService.getAllGyms();
    res.status(200).json(gyms);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getOneGym = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID manquant" });

    const gym = await gymService.getOneGym(id);
    if (!gym) return res.status(404).json({ message: "Gym non trouvé" });

    res.status(200).json(gym);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const modifyGym = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID manquant" });

    await gymService.modifyGym(id, req.body);
    res.status(200).json({ message: "Gym modifié !" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGym = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID manquant" });

    await gymService.deleteGym(id);
    res.status(200).json({ message: "Gym supprimé !" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
