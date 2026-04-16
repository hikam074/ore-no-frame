// export async function apiFetch<T>(
//     url: string,
//     options?: RequestInit
// ): Promise<T> {
//     const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL!}${url}`

//     const res = await fetch(fullUrl, {
//         ...options,
//         credentials: "include",
//         cache: "no-store",
//         headers: {
//             ...(options?.body instanceof FormData
//                 ? {}
//                 : { "Content-Type": "application/json" }),
//             ...(options?.headers || {}),
//         }
//     })
//     if (res.status === 401) {
//         throw new Error("Unauthorized");
//     }
//     if (!res.ok) {
//         // console.log(`[LOG] HIT ${fullUrl} : ${res.status} ${res.statusText}`)
//         throw new Error(`Request failed: ${res.status}`)
//     }

//     const json = await res.json()

//     if (json.error) {
//         throw new Error(json.error)
//     }
//     // console.log(`[LOG] HIT ${fullUrl} : ${res.status} ${res.statusText}`)

//     return json.data as T
// }
const FETCH_TIMEOUT_MS = 15_000

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL!}${url}`

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
        const res = await fetch(fullUrl, {
            ...options,
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
            headers: {
                ...(options?.body instanceof FormData
                    ? {}
                    : { "Content-Type": "application/json" }),
                ...(options?.headers || {}),
            },
        })

        if (res.status === 401) {
            throw new Error("Unauthorized")
        }
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }

        const json = await res.json()

        if (json.error) {
            throw new Error(json.error)
        }

        return json.data as T

    } catch (err) {
        if ((err as Error).name === "AbortError") {
            throw new Error(`Request timeout setelah ${FETCH_TIMEOUT_MS / 1000}s`)
        }
        throw err
    } finally {
        clearTimeout(timer)
    }
}