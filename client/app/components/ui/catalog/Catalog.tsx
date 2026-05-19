import { FC } from "react";
import { Text, View } from "react-native";
import { ICatalog } from "./catalog.interface";
import { Heading } from "lucide-react"

const Catalog: FC<ICatalog> = ({title, products}) => {
    return (
        <View className="mb-16">
            {title && <Heading></Heading>}
            
            {products?.length ? (
                <View className="flex-row flex-wrap justify-between mt-4">
                    {products.map(product => (
                        <Text key={product.id}>{product.name}</Text>
                    ))}
                </View>
            ):(
                <Text className="mt-2">Products not found</Text>
            )}
        </View>
    )
}

export default Catalog