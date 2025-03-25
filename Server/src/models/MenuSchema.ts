import mongoose from "mongoose";

export interface menuType extends Document {
    name: string
    description: string
    isDeleted: boolean
}

const mensuSchema = new mongoose.Schema<menuType>({

    name: { type: String, required: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false }
},
    { timestamps: true }
)

const Menu = mongoose.model<menuType>("Menu", mensuSchema);
export default Menu;