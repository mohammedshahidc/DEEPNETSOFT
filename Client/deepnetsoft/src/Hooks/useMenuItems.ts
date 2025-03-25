import { MenuItemState, itemDetailes } from "@/Types/type";
import axiosErrorManager from "@/Utils/axiosErrorManager";
import { axiosInstance } from "@/Utils/axiosInstance";
import { create } from "zustand";

export const useMenuItem = create<MenuItemState>((set) => ({
    loading: false,
    error: null,
    menuItem: null,
    fetchMenuItem: async (id: string) => {
        try {
            set({ loading: true })
            const response = await axiosInstance.get(`/menuitem/get/${id}`)
            set({ loading: false, menuItem: response.data.data })
        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })
        }
    },
    createMenuItem: async (itemDetailes: itemDetailes) => {
        try {
            set({ loading: true })
            await axiosInstance.post("/menuitem/add", itemDetailes)
            set({ loading: false })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    }
}))