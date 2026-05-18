import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import PrivateNavigator from "./PrivateNavigator";
import BottomMenu from "@/components/layout/bottom-menu/BottomMenu";
import { useAuth } from "@/hooks/useAuth";
import { TypeRootParamList } from "./navigation.types";
import { useCheckAuth } from "@/providers/auth/useCheckAuth";

const Navigation: FC = () => {
    const { user } = useAuth()
    const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)

    const navRef = useNavigationContainerRef<TypeRootParamList>()

    useEffect(() => {
        if (navRef.isReady()) {
            setCurrentRoute(navRef.getCurrentRoute()?.name)
        }

        const listener = navRef.addListener('state', () => {
            setCurrentRoute(navRef.getCurrentRoute()?.name)
        })

        return () => {
            navRef.removeListener('state', listener)
        }
    }, [navRef])

    useCheckAuth(currentRoute)

    return (
        <>
            <NavigationContainer 
                ref={navRef}
                key={user ? 'authorized' : 'unauthorized'} 
            >
                <PrivateNavigator />
            </NavigationContainer>
            {user && currentRoute && (
                <BottomMenu 
                    key={currentRoute}
                    nav={navRef.navigate}
                    currentRoute={currentRoute} 
                />
            )}
        </>
    )
}
export default Navigation