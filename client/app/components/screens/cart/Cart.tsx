import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/button/Button";
import Heading from "@/components/ui/Heading";
import { useCart } from "@/hooks/useCart";
import { converPrice } from "@/utils/converPrice";
import { FC } from "react";
import { Text, View } from "react-native";
import CartItem from "./cart-item/CartItem";
import { useCheckout } from "./useCheckout";

const Cart: FC = () => {
    const {items, total} = useCart()

    const {onCheckout} = useCheckout()

    return (
        <>
            <Layout>
                <Heading>Cart</Heading>

                {items.length ? (
                    items.map(item => <CartItem key={item.id} item={item}/>)
                ):(
                    <Text className="mt-2">Product not  found</Text>
                )}
            </Layout>
            {items.length ? (
                <View className="bottom-8 absolute w-[90%] mx-5">
                    <Text className="font-bold text-xl">
                        Total: {converPrice(total)}
                    </Text>
                    <Button onPress={() => onCheckout()}>Place order</Button>
                </View>
            ) : null}
        </>
    )
}

export default Cart