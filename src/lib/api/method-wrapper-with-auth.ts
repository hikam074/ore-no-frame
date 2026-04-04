import { getAccessToken } from "../auth-client"
import { apiDelete, apiGet, apiPost, apiPut } from "./method-wrapper"

async function withAuth(options?: RequestInit): Promise<RequestInit> {
    const token = await getAccessToken()

    return {
        ...options,
        headers: {
            ...options?.headers,
            ...(token && { Authorization: `Bearer ${token}` }),
        }
    }
}

export async function apiGetAuth<T>(
    url: string,
    options?: RequestInit
) {
    const authOptions = await withAuth(options)

    return apiGet<T>(url, authOptions)
}
export async function apiPostAuth<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
) {
    const authOptions = await withAuth(options)

    return apiPost<T>(url, body, authOptions)
}
export async function apiPutAuth<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
) {
    const authOptions = await withAuth(options)

    return apiPut<T>(url, body, authOptions)
}
export async function apiDeleteAuth<T>(
    url: string,
    options?: RequestInit
) {
    const authOptions = await withAuth(options)

    return apiDelete<T>(url, authOptions)
}