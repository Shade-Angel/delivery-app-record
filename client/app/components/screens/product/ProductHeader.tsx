import { FC } from "react"
import { IProductComponent } from "./product-page.interface"
import { useTypedNavigation } from "@/hooks/useTypedNavigation"
import { View } from "react-native"
import ProductButton from "./ProductButton"

const ProductHeader: FC<IProductComponent> = ({product}) => {
    const {goBack} = useTypedNavigation()

    return (
        <View>
            <View className="flex-row justify-between mt-2">
                <ProductButton onPress={goBack} icon="chevron-left" iconSize={26} color="#555"/>
            </View>
        </View>
    )
}

export default ProductHeader