"use client";
import { useMenu } from "@/Hooks/useMenu";
import axiosErrorManager from "@/Utils/axiosErrorManager";
import React, { useState } from "react";

interface MenuFormProps {
    setIsOppen: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ setIsOppen }) => {
    const { createMenu, loading, error, fetchAllMenu } = useMenu();
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);
            await createMenu(formData);
            await fetchAllMenu();
            setIsOppen();
        } catch (error) {
            axiosErrorManager(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-xl font-semibold mb-4">Add a menu</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
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

                    <button
                        type="submit"
                        className={`w-full py-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MenuForm;