import { FC } from "react";
import { Image, View } from "react-native";
import { useProduct } from "./useProduct";
import Layout from "@/components/layout/Layout";
import { getMediaSource } from "@/utils/getMediaSource";
import Loader from "@/components/ui/Loader";
import ProductHeader from "./ProductHeader";

const Product: FC = () => {
    const {isLoading, product} = useProduct()

    if(isLoading) return <Loader />
    if(!product) return null

    return (
        <Layout>
            <ProductHeader product={product}/>
            <View className="items-center justify-center mt-4">
                <Image source={getMediaSource(product.image)}
                    width={260}
                    height={260}
                />
            </View>
        </Layout>
    )
}

export default Product