import { FoldersList, Header, styles } from './index'

export const MainPage = () => {
    return (
        <section className={styles.main}>
            <Header />
            <FoldersList />
        </section>
    )
}