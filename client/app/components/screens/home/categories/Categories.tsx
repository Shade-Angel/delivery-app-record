import { FC } from "react";
import { useGetAllCategories } from "./useGetAllCategories";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import Loader from "@/components/ui/Loader";
import { View } from "react-native";
import Heading from "@/components/ui/Heading";

const Categories: FC = () => {
    const {categories, isLoading} = useGetAllCategories()

    const {navigate} = useTypedNavigation()

    return isLoading ? (
        <Loader />
    ) : (
        <View className="flex flex-col mt-5 mb-4">
            <Heading>Categories</Heading>

            <View className="flex-row justify-center mt-5">
                
            </View>
        </View>
    )
}

export default Categories