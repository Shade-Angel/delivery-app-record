import { EnumAsyncStorage, EnumSecureStore, IAuthResponse, ITokens } from "@/types/auth.interface"
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAccessToken = async () => {
    console.log('[auth.helper] getAccessToken: reading from SecureStore') 
    const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN)
    console.log('[auth.helper] getAccessToken result:', accessToken ? 'token exists' : 'null')
    return accessToken || null
}

export const saveTokensStorage = async (data: ITokens) => {
    console.log('[auth.helper] saveTokensStorage: saving', data.accessToken)
    await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.accessToken)
    await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refreshToken)
    console.log('[auth.helper] saveTokensStorage: done')
}

export const deleteTokensStorage = async () => {
    console.log('[auth.helper] deleteTokensStorage')
    await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)
    await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)
}

export const getUserFromStorage = async () => {
    try {
         return JSON.parse((await AsyncStorage.getItem(EnumAsyncStorage.USER)) || '{}')
    } catch (e) {
        console.error(e)
        return null
    }
}

export const saveToStorage = async (data: IAuthResponse) => {
    console.log('[auth.helper] saveToStorage: saving user and tokens')
    await saveTokensStorage(data)
    try {
        await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(data.user))
        console.log('[auth.helper] saveToStorage: user saved')
    } catch (error) {
        console.error(error)
    }
}