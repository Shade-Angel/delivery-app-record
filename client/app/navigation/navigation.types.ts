import { ComponentType } from "react"

export type TypeRootParamList = {
    Auth: undefined
    Home: undefined
    Favorites: undefined
    Search: undefined
    Explorer: undefined
    Profile: undefined
    Cart: undefined
}

export interface IRoute {
    name: keyof TypeRootParamList
    component: ComponentType
}