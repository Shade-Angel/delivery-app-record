import { ComponentType } from "react"

export type TypeRootParamList = {
    Auth: undefined
    Home: undefined
    Favorites: undefined
    Search: undefined
    Explorer: undefined
    Profile: undefined
    Cart: undefined
    Category: {
        slug: string
    }
}

export interface IRoute {
    name: keyof TypeRootParamList
    component: ComponentType
}