export default function LoginPage() {
    return (
        <article>
            <header>
                <h1>Selamat Datang Kembali</h1>
                <p>Silahkan login</p>
            </header>
            <section>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" />
                </div>
            </section>

        </article>
    )
}