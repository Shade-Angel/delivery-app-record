import { API_URL } from "@/config/api.config";
import axios from "axios";
import { deleteTokensStorage, getAccessToken } from "../auth/auth.helper";
import { errorCatch } from "./error.api";
import { getNewTokens } from "./helper.auth";

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Перехватчик запросов - добавляем логи
instance.interceptors.request.use(async (config) => {
    console.log('[interceptor] Request interceptor called');
    const accesToken = await getAccessToken();
    console.log('[interceptor] Token from getAccessToken():', accesToken ? 'exists' : 'null');
    if (config.headers && accesToken) {
        config.headers.Authorization = `Bearer ${accesToken}`;
        console.log('[interceptor] Authorization header set');
    } else {
        console.log('[interceptor] No token, authorization header NOT set');
    }
    console.log('[interceptor] Final URL:', config.baseURL ?? '' + config.url);
    console.log('[interceptor] config.url:', config.url);
    console.log('[interceptor] Full URL:', `${config.baseURL}${config.url || ''}`);
    return config;
});

// Перехватчик ответов - добавляем логи ошибок
instance.interceptors.response.use(
    config => config,
    async error => {
        console.log('[interceptor] Response error intercepted. Status:', error.response?.status);
        const originalRequest = error.config;
        if (
            (error.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            console.log('[interceptor] Attempting to refresh tokens...');
            originalRequest._isRetry = true;
            try {
                await getNewTokens();
                console.log('[interceptor] Tokens refreshed, retrying original request');
                return instance.request(originalRequest);
            } catch (refreshError) {
                console.log('[interceptor] Token refresh failed:', errorCatch(refreshError));
                if (errorCatch(refreshError) === 'jwt expired')
                    await deleteTokensStorage();
            }
        }
        throw error;
    }
);

export default instance;