import { Response, Request, NextFunction } from 'express'
import CustomError from '../utils/CustomError'
import Menu from '../models/menuSchema';




export const createMenu = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body
    if (!name || !description) {
        return next(new CustomError("All fields are required", 400))
    }
    const newMenu = new Menu({ name, description })
    await newMenu.save()
    res.status(200).json({ error: false, message: "New Menu Added Successfully", data: newMenu })
}

export const getAllMenu = async (req: Request, res: Response, next: NextFunction) => {
    console.log('fgvv');

    const allMenu = await Menu.find({ isDeleted: false })
    console.log("sss", allMenu);

    if (!allMenu) {
        return next(new CustomError("Menu's not found", 404));
    }
    res.status(200).json({ error: false, message: "All menu", data: allMenu })
}

export const getMenuById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
        return next(new CustomError("Id is required", 404));
    }
    const menu = await Menu.findById(id)
    if (!menu) {
        return next(new CustomError("Menu not found", 404));

    }
    res.status(200).json({ error: false, message: "Menu By Id", data: menu })
}