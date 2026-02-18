export default function Loading() {
    return (
        <article className='m-4 rounded space-y-6 animate-pulse'>
            {/* HEADER */}
            <header className='text-center pt-2'>
                <div className="h-6 w-48 bg-gray-300 rounded mx-auto"></div>
            </header>

            {/* ANIME FINDING */}
            <section className="p-2 border rounded-lg relative">
                <div className="absolute -top-4 left-2 h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded mt-4"></div>
                <div className="h-10 bg-gray-300 rounded mt-2"></div>
            </section>

            {/* REVIEW INPUT */}
            <section className='border p-2 rounded-md relative'>
                <div className="absolute -top-4 left-2 h-5 w-28 bg-gray-300 rounded"></div>
                <div className="h-40 bg-gray-300 rounded mt-4"></div>
            </section>

            {/* SUBMIT */}
            <section className="flex justify-center">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </section>
        </article>
    )
}
