import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { ICartItem } from "@/types/cart.interface";
import { getMediaSource } from "@/utils/getMediaSource";
import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import CartIAction from "./CartActions";
import { converPrice } from "@/utils/converPrice";

interface ICartItemProps {
    item: ICartItem
}

const CartItem: FC<ICartItemProps> = ({item}) => {
    const {navigate} = useTypedNavigation()
    return (
        <View className="flex-row mt-5">
            <Pressable onPress={() => navigate('Product', {slug: item.product.slug})}
                className="bg-gray-100 rounded-xl overflow-hidden py-3 px-3 items-center w-28"   
            >
                <Image source={getMediaSource(item.product.image)} width={80} height={80}/>
            </Pressable>

            <View className="ml-5 mt-2">
                <Text className="font-semibold text-xl">
                    {item.product.name}
                </Text>
                <Text className="mt-1">
                    {converPrice(item.price)}
                </Text>
                <CartIAction item={item}/>
            </View>
        </View>
    )
}

export default CartItem