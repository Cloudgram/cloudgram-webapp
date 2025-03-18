import { FoldersList } from "../../components/FoldersList/FoldersList"
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"

export const MainPage = () => {
    return (
        <section className="main">
            <Header />
            <FoldersList />
            <Footer />
        </section>
    )
}