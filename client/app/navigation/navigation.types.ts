import { ComponentType } from "react"

export type TypeRootParamList = {
    Auth: undefined
    Home: undefined
}

export interface IRoute {
    name: keyof TypeRootParamList
    component: ComponentType
}