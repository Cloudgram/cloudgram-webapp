import styles from './Header.module.scss';
import { HeaderTitle } from './HeaderTitle';
import { HeaderCreateButton } from './HeaderCreateButton';
import { HeaderUserProfile } from './HeaderUserProfile';
import { HeaderSearch } from './HeaderSearch';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__left}>
                    <HeaderTitle />
                </div>
                <HeaderSearch />
                <div className={styles.header__right}>
                    <HeaderCreateButton />
                    <HeaderUserProfile />
                </div>
            </div>
        </header>
    );
};
