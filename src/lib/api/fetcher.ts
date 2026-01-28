export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const fullUrl = `${process.env.BACKEND_URL!}${url}`
    const res = await fetch(fullUrl, {
        ...options,
        credentials: "include",
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }

    const json = await res.json()

    if (json.error) {
        throw new Error(json.error)
    }
    console.log(`[LOG] HIT ${fullUrl} : ${res.status} ${res.statusText}`)
    return json.data as T
}
