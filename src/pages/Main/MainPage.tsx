import { FoldersList } from "../../components/FoldersList/FoldersList"
import { Header } from "../../components/Header/Header"
import styles from "./MainPage.module.scss"

export const MainPage = () => {
    return (
        <section className={styles.main}>
            <Header />
            <FoldersList />
            {/* <Footer /> */}
        </section>
    )
}