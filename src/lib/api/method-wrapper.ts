import { apiFetch } from "./fetcher"

function prepareBody(body: unknown): BodyInit | undefined {
    if (!body) return undefined
    if (body instanceof FormData) return body
    return JSON.stringify(body)
}

export function apiGet<T>(
    url: string,
    options?: RequestInit
) {
    return apiFetch<T>(url, {
        ...options,
        method: "GET",
    })
}

export function apiPost<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
) {
    return apiFetch<T>(url, {
        ...options,
        method: "POST",
        body: prepareBody(body),
    })
}

export function apiPut<T>(
    url: string,
    body?: unknown,
    options?: RequestInit
) {
    return apiFetch<T>(url, {
        ...options,
        method: "PUT",
        body: prepareBody(body),
    })
}

export function apiDelete<T>(
    url: string,
    options?: RequestInit
) {
    return apiFetch<T>(url, {
        ...options,
        method: "DELETE",
    })
}