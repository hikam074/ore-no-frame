export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL!}${url}`
    console.log("FETCH START", fullUrl)
    const res = await fetch(fullUrl, {
        ...options,
        credentials: "include",
        cache: "no-store",
        headers: {
            ...(options?.body instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
            ...(options?.headers || {}),
        }
    })
    if (res.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        console.log(`[LOG] HIT ${fullUrl} : ${res.status} ${res.statusText}`)
        throw new Error(`Request failed: ${res.status}`)
    }
    console.log("FETCH END", res.status)

    const json = await res.json()

    if (json.error) {
        throw new Error(json.error)
    }
    console.log(`[LOG] HIT ${fullUrl} : ${res.status} ${res.statusText}`)

    return json.data as T
}
