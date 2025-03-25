import MenuItem from "../models/MenuItemSchema";
import { Request, Response, NextFunction } from 'express'
import CustomError from "../utils/CustomError";


export const addMenuItem = async (req: Request, res: Response, next: NextFunction) => {
    const { itemName, description, price, menuId } = req.body
    if (!itemName || !description || !price || !menuId) {
        return next(new CustomError("All fields are required", 400))

    }
    const newItem = new MenuItem({ itemName, description, price, menuId })
    await newItem.save()
    res.status(200).json({ error: false, message: "New menu item added successfully", data: newItem })
}

export const getmenuItems = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
        return next(new CustomError("Menu id is required", 400))

    }
    const menuItem = await MenuItem.find({ menuId: id, isDeleted: false })
    if (!menuItem) {
        return next(new CustomError("Menu item not found", 400))

    }
    res.status(200).json({ error: false, message: "menu items", data: menuItem })
}