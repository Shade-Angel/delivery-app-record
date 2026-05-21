import { TypeFeatherIconNames } from "@/types/icon.interface";
import { FC, PropsWithChildren } from "react";
import { Pressable, PressableProps, View } from "react-native";
import cn from "clsx"
import { Feather } from '@expo/vector-icons'

interface IProductButton extends PressableProps {
    icon?: TypeFeatherIconNames
    iconSize?: number
    color?: string
    className?: string
}

const ProductButton: FC<PropsWithChildren<IProductButton>> = ({
    children,
    icon,
    iconSize,
    color, 
    className,
    ...rest
}) => {
    return (
        <Pressable {...rest}>
            <View 
                className={cn(
                    'items-center justify-center overflow-hidden bg-gray-200 p-3 rounded-full',
                    className
                )}
            >
                {children ? (
                    children
                ):(
                    <Feather name={icon} size={iconSize} color={color}/>
                )}

            </View>
        </Pressable>
    )
}

export default ProductButton