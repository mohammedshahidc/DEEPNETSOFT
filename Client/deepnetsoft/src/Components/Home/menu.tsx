"use client";
import { useMenu } from "@/Hooks/useMenu";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MenuForm from "./forms/MenuForm";
import { useMenuItem } from "@/Hooks/useMenuItems";
import MenuItemForm from "./forms/MenuItemForm";

const Menu = () => {
    const [activeMenu, setActiveMenu] = useState<string>("");
    const { AllMenus, fetchAllMenu } = useMenu();
    const { menuItem, loading, error, fetchMenuItem } = useMenuItem();

    const [isOppen, setIsOppen] = useState<boolean>(false);
    const [isoppenitemForm, setisoppenitemForm] = useState<boolean>(false);

    const togleform = () => {
        setIsOppen(!isOppen);
    };
    const togleitemform = () => {
        setisoppenitemForm(!isoppenitemForm);
    };
    useEffect(() => {
        if (AllMenus && AllMenus.length > 0 && !activeMenu) {
            setActiveMenu(AllMenus[0]._id);
        }
    }, [AllMenus]);
    useEffect(() => {
        fetchAllMenu();
    }, [fetchAllMenu]);

    useEffect(() => {
        if (activeMenu) {
            fetchMenuItem(activeMenu);
        }
    }, [activeMenu, fetchMenuItem]);

    const activeMenuName = AllMenus?.find((menu) => menu._id === activeMenu)?.name;

    return (
        <section className="relative w-full text-white">
            <div className="relative w-full before:absolute before:inset-0 before:bg-black before:opacity-50 before:z-0">
                <div
                    style={{
                        backgroundImage: `url("/images/buttonBg.png")`,
                        backgroundSize: "auto 100%",
                        backgroundRepeat: "repeat-x",
                        backgroundPosition: "top",
                    }}
                    className="w-full py-2 relative"
                >
                    <div className="flex justify-center">
                        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide max-w-fit mx-auto">
                            <div className="flex space-x-4 w-max">
                                {AllMenus?.map((menu) => (
                                    <Button
                                        key={menu._id}
                                        onClick={() => setActiveMenu(menu._id)}
                                        sx={{
                                            backgroundColor: activeMenu === menu._id ? "#334155" : "black",
                                            "&:hover": { backgroundColor: "#1e293b" }, marginRight: "2px"
                                        }}
                                        variant={activeMenu === menu._id ? "contained" : "outlined"}
                                        color="primary"
                                    >
                                        {menu.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#334155" } }}
                            onClick={togleform}
                        >
                            Add Menu
                        </Button>
                    </div>
                </div>
            </div>

            {isOppen && <MenuForm setIsOppen={togleform} />}
            {isoppenitemForm && <MenuItemForm setisoppenitemForm={togleitemform} menuId={activeMenu} />}

            <div className="relative w-full py-10 px-6">
                <div
                    style={{
                        backgroundImage: `url("/images/menuBg.png")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="absolute inset-0 backdrop-opacity-75 z-0"
                ></div>

                <div className="relative max-w-4xl mx-auto border border-green-500 p-6 z-10">
                    <h2 className="text-3xl font-bold text-center mb-4">{activeMenuName} Cocktails</h2>

                    {loading && <p className="text-center text-gray-300">Loading menu items...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    <div className="grid md:grid-cols-2 gap-4">
                        {menuItem && menuItem.length > 0 ? (
                            menuItem.map((item) => (
                                <div key={item._id}>
                                    <h3 className="font-semibold">{item.itemName}......................${item.price}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))
                        ) : (
                            !loading && !error && <p className="text-center text-gray-300">No items available.</p>
                        )}
                    </div>

                    {activeMenu && (
                        <div className="flex justify-center mt-4">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#334155" } }}
                                onClick={togleitemform}
                            >
                                Add Menu Item
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Menu;
