import { NavigationContainer } from "@react-navigation/native";
import { FC } from "react";
import PrivateNavigator from "./PrivateNavigator";


const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <PrivateNavigator />
        </NavigationContainer>
    )
}

export default Navigation