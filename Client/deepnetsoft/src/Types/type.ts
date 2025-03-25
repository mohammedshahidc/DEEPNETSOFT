export interface MenuType {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface menuDt{
    name:string
    description:string
}
export interface MenuState {
    AllMenus: MenuType[] | null
    MenuById: MenuType | null
    error: string | null
    loading: boolean
    fetchAllMenu: () => Promise<void>
    createMenu:(menuDetailes:menuDt)=>Promise<void>
}

export interface MenuItemType {
    _id: string;
    itemName: string;
    description: string;
    price: number;
    menuId: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface itemDetailes{
    itemName:string,
    description:string,
    price:number
    menuId:string
}

export interface MenuItemState{
    menuItem:MenuItemType[]|null
    loading:boolean
    error:string|null
    fetchMenuItem:(id:string)=>Promise<void>
    createMenuItem:(itemDetailes:itemDetailes)=>Promise<void>

}