"use client";
import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useMenuItem } from "@/Hooks/useMenuItems";

interface MenuItemFormProps {
    setisoppenitemForm: () => void;
    menuId: string;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ setisoppenitemForm, menuId }) => {
    const { createMenuItem, loading, error, fetchMenuItem } = useMenuItem();
    const [formData, setFormData] = useState({
        itemName: "",
        description: "",
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMenuItem({ ...formData, menuId: menuId });
            await fetchMenuItem(menuId)
            setisoppenitemForm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            value={formData.itemName}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" onClick={() => setisoppenitemForm()} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Add Item"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuItemForm;
