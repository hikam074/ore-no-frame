// submit review ke BE

export async function createReview(payload: {
    mal_id: number
    review: string
}, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            mal_id: payload.mal_id,
            review: payload.review
        })
    })
    if (!res.ok) throw new Error("Failed to create review")
    return res.json()
}
