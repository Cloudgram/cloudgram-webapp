import styles from './Footer.module.scss'
import { profile, premium, home } from './index.ts'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                    <a href="/" className={styles.footer__button}>
                        <img src={profile} alt="" className={styles.footer__icon} />
                        <p className={styles.item__title}>Профиль</p>
                    </a>
                </li>
                <li className={styles.footer__item}>
                    <a href="/" className={styles.footer__button}>
                        <img src={premium} alt="" className={styles.footer__icon} />
                        <p className={styles.item__title}>Премиум</p>
                    </a>
                </li>
                <li className={styles.footer__item}>
                    <a href="/" className={styles.footer__button}>
                        <img src={home} alt="" className={styles.footer__icon} />
                        <p className={styles.item__title}>Главная</p>
                    </a>
                </li>
            </ul>
        </footer>
    )
}