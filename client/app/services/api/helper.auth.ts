import { API_URL, getAuthUrl } from "@/config/api.config"
import { EnumSecureStore, IAuthResponse } from "@/types/auth.interface"
import axios from "axios"
import { getItemAsync } from "expo-secure-store"
import { saveToStorage } from "../auth/auth.helper"

export const getNewTokens = async () => {
    console.log('[helper.auth] getNewTokens started')
    try {
        const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)
        console.log('[helper.auth] refreshToken:', refreshToken ? 'exists' : 'null')

        const response = await axios.post<string, {data: IAuthResponse}>(
            API_URL + getAuthUrl('/login/access-token'), {refreshToken}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('[helper.auth] refresh response status(data):', response.data)
        if(response.data.accessToken) await saveToStorage(response.data)

        return response
    } catch (e) {
        console.error('[helper.auth] error:', e)
    }
}