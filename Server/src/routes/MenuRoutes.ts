import express from "express";
import tryCatch from "../utils/tryCatch";
import { createMenu, getAllMenu, getMenuById } from "../controllers/menuController";

const menuRoutes = express.Router()
menuRoutes
    .post('/add', tryCatch(createMenu))
    .get('/getall', tryCatch(getAllMenu))
    .get('/getbyid/:id', tryCatch(getMenuById))

export default menuRoutes