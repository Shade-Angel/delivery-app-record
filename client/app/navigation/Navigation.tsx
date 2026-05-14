import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { TypeRootParamList } from "./navigation.types";
import { routes } from "./routes";

const Stack = createNativeStackNavigator<TypeRootParamList>()

const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#fff'
                }
            }}>
                {routes.map(routes => (
                    <Stack.Screen key={routes.name} 
                    {...routes} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation