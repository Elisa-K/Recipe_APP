import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Layout({ children }) {
    return (
        <>
            <div className="container">
                <Header />
                <main className="pt-4">{children}</main>
            </div>
            <Footer />
        </>
    )
}