import { API_URL, getAuthUrl } from "@/config/api.config"
import { EnumSecureStore, IAuthResponse } from "@/types/auth.interface"
import axios from "axios"
import { getItemAsync } from "expo-secure-store"
import { saveToStorage, deleteTokensStorage } from "../auth/auth.helper"

export const getNewTokens = async () => {
  try {
    const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)
    console.log('[helper.auth] refreshToken exists:', !!refreshToken)

    const response = await axios.post<IAuthResponse>(
      API_URL + getAuthUrl('/login/access-token'),
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (response.data.accessToken) {
      await saveToStorage(response.data)
      console.log('[helper.auth] success, new tokens saved')
    }
    return response
  } catch (e: any) {
    console.error('[helper.auth] error:', e?.response?.status, e?.response?.data?.message)
    // Если refresh токен истек или невалиден, удаляем токены
    if (e?.response?.status === 401) {
      await deleteTokensStorage()
      // Здесь можно выбросить ошибку дальше, чтобы приложение разлогинилось
    }
    throw e
  }
}