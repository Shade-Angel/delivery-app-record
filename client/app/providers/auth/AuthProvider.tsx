import * as SplashScreen from 'expo-splash-screen'
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react'

import { IUser } from '@/types/user.interface'

import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'

import { IContext, TypeUserState } from './auth-provider.interface'

export const AuthContext = createContext<{
  user: IUser | null
  isLoading: boolean
  setUser: Dispatch<SetStateAction<IUser | null>>
}>({
  user: null,
  isLoading: false,
  setUser: () => {}
})

let _ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const checkAccessToken = async () => {
      try {
        const accessToken = await getAccessToken()

        if (accessToken) {
          const user = await getUserFromStorage()
          if (isMounted) {
            setUser(user)
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        if (isMounted) {
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
    <AuthContext.Provider value={{ user, isLoading, setUser }}> 
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider