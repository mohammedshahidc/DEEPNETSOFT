import express from 'express'
import tryCatch from '../utils/tryCatch'
import { addMenuItem, getmenuItems } from '../controllers/MenuItemController'


const MenuItemRoutes = express.Router()
MenuItemRoutes
    .post("/add", tryCatch(addMenuItem))
    .get("/get/:id", tryCatch(getmenuItems))

export default MenuItemRoutes