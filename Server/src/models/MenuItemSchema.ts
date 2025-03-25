import mongoose, { Schema, Document } from "mongoose";

export interface MenuItemType extends Document {
    itemName: string;
    description: string;
    price: number;
    menuId: mongoose.Types.ObjectId
    isDeleted: boolean
}

const MenuItemSchema = new Schema<MenuItemType>(
    {
        itemName: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        menuId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        isDeleted: { type: Boolean, required: true, default: false }
    },
    {
        timestamps: true,
    }
);

const MenuItem = mongoose.model<MenuItemType>("MenuItem", MenuItemSchema);
export default MenuItem;
