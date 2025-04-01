// import { Load } from '../../components/Loader/Load'
import { FoldersList, Header, styles } from './index'

export const MainPage = () => {
    return (
        <section className={styles.main}>
            {/* <Load type="box-rotate-z" bgColor={'black'} color={'black'} title={'LOADING...'} size={100} /> */}
            <Header />
            <FoldersList />
        </section>
    )
}