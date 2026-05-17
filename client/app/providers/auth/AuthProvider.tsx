import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import { IContext, TypeUserState } from "./auth-provider.interface";
import * as SplashScreen from 'expo-splash-screen'
import { IUser } from "@/types/user.interface";
import { getAccessToken, getUserFromStorage } from "@/services/auth/auth.helper";

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [user, setUser] = useState<TypeUserState>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const checkAccessToken = async () => {
            try {
                const accessToken = await getAccessToken()
                
                if(accessToken) {
                    const user = await getUserFromStorage()
                    if(isMounted && user && user.id) {
                        setUser(user)
                    }
                }
            } catch (error) {
            } finally {
                if(isMounted) {
                    setIsLoading(false)
                    await SplashScreen.hideAsync()
                }
            }
        }

        checkAccessToken()

        return () => {
            isMounted = false
        }
    }, [])

    if (isLoading) {
        return null
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider