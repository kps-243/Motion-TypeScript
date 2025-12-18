import { Request, Response } from "express";
import * as userService from "../services/user";


export const signup = async (req: Request, res: Response) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const user = await userService.getOneUser(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};


export const modifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    await userService.modifyUser(id, req.body);

    res.status(200).json({ message: "Utilisateur modifié !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    await userService.deleteUser(id);

    res.status(200).json({ message: "Utilisateur supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

