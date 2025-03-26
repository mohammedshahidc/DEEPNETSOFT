import mongoose, { Schema, Document } from "mongoose";

export interface MenuType extends Document {
    name: string;
    description: string;
    isDeleted: boolean;
}

const menuSchema: Schema<MenuType> = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const Menu = mongoose.model<MenuType>("Menu", menuSchema);
export default Menu;
