import { TypeRootParamList } from "@/navigation/navigation.types";
import { TypeFeatherIconNames } from "@/types/icon.interface";

export interface IMenuItem {
    icon: TypeFeatherIconNames,
    path: keyof TypeRootParamList
}

export type TypeNavigate = (screenName: keyof TypeRootParamList) => void