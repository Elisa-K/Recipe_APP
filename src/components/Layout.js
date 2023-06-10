import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <>
            <div className="container">
                <Header />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}