import mongoose from 'mongoose'
import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './middlewares/ErrorHandler';
import CustomError from './utils/CustomError';
import menuRoutes from './routes/MenuRoutes';
import MenuItemRoutes from './routes/MenuItemRoutes';

dotenv.config();
const server = express()
const PORT = process.env.PORT
server.use(cookieParser());


if (!process.env.MONGOOSECONNECTION) {
    throw new Error("Missing MONGOOSECONNECTION in .env file");
}

mongoose.connect(process.env.MONGOOSECONNECTION)
    .then(() => {
        console.log("db connected successfully");

    })
    .catch((err) => {
        console.log("errpr:", err);

    })
if (!process.env.FRONTENDURL) {
    throw new Error("Missing FRONTENDURL in .env file");
}
server.use(cors({
    origin: process.env.FRONTENDURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use('/api/menu', menuRoutes)
server.use('/api/menuitem', MenuItemRoutes)
server.use(errorHandler)

server.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(`cannot ${req.method} ${req.originalUrl}`, 404)
    next(err)
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});