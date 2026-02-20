import { use } from "react";
import User from "../models/user.model";

export const createUser = async (req, res) => {
    //validar el req.body
    try {
        const user = await User.create(req.body);
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
