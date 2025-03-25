import { create } from "zustand";
import { axiosInstance } from "@/Utils/axiosInstance";
import axiosErrorManager from "@/Utils/axiosErrorManager";
import { MenuState, menuDt } from "@/Types/type";


export const useMenu = create<MenuState>((set) => ({
    AllMenus: null,
    MenuById: null,
    error: null,
    loading: false,
    fetchAllMenu: async () => {
        try {
            set({ loading: true })
            console.log('fvfer');
            const response = await axiosInstance.get("/menu/getall")
            set({ loading: false, error: null, AllMenus: response.data.data })
        } catch (error) {
            const message = axiosErrorManager(error)
            console.log('err:', error);

            set({ loading: false, error: message })

        }
    },
    createMenu: async (menuDetailes: menuDt) => {
        try {
            set({ loading: true })
            axiosInstance.post("/menu/add", menuDetailes)
            set({ loading: false, error: null })

        } catch (error) {
            const message = axiosErrorManager(error)
            set({ loading: false, error: message })

        }
    }
}))

