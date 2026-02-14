export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const fullUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL!}${url}`
    const res = await fetch(fullUrl, {
        ...options,
        credentials: "include",
        cache: "no-store",
    })
    if (res.status === 401) {
        if (typeof window !== 'undefined') {
            // Redirect ke login dan bersihkan sesi lokal jika perlu
            window.location.href = '/'; 
            // Return promise kosong agar tidak lanjut mengeksekusi kode di bawah
            return new Promise(() => {}); 
        }
    }
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
