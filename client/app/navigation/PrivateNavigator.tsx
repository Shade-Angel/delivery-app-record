import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TypeRootParamList } from "./navigation.types";
import { FC } from "react";
import { routes } from "./routes";
import { useAuth } from "@/hooks/useAuth";
import Auth from "@/components/screens/auth/Auth";

const Stack = createNativeStackNavigator<TypeRootParamList>()

const PrivateNavigator: FC = () => {
    const { user } = useAuth()

    return (
        <Stack.Navigator screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            {user ? (
                routes.map(routes => (
                    <Stack.Screen key={routes.name} {...routes} />
                ))
            ) : (
                <Stack.Screen name="Auth" component={Auth}/>
            )}
        </Stack.Navigator>
    )
}

export default PrivateNavigator