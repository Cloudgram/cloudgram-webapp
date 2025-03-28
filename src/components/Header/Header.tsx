import { UserType } from '../../types/UserType';
import { profile, home, avatar, styles, bot, getUser, useEffect, useState, useMutation, useNavigate } from './index'


export const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>();

    const userMutation = useMutation({
        mutationFn: () => getUser(),
        onSuccess(data: UserType) {
            setUser(data);
        },
        onError() {
            navigate('/auth', { replace: true });
            throw new Error('Сессия истекла или была заблокирована');
        }
    })

    useEffect(() => {
        userMutation.mutate();
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.header__left}>
                <div className={styles.header__user}>
                    <div className={styles.icon__container}>
                        {user?.avatar ? (
                            <img
                                src={`data:image/jpeg;base64,${user.avatar}`}
                                alt="user icon"
                                className={styles.user__icon}
                            />
                        ) : (
                            <img
                                src={avatar}
                                alt="user icon"
                                className={styles.user__icon}
                            />
                        )}
                    </div>
                    <div className={styles.header__username}>
                        <span className={styles.full__name}>{user?.full_name}</span>
                        <span className={styles.user__name}>{`@${user?.username}`}</span>
                    </div>
                </div>
            </div>
            <div className={styles.search__container}>
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8256 15.7098L12.757 11.6411C13.9157 10.2263 14.4861 8.42007 14.3501 6.59634C14.2142 4.77262 13.3823 3.07096 12.0266 1.84353C10.6709 0.616093 8.89524 -0.0431611 7.06702 0.00219419C5.23879 0.0475495 3.49798 0.794042 2.20484 2.08719C0.911688 3.38034 0.165195 5.12115 0.119839 6.94937C0.0744842 8.7776 0.733738 10.5533 1.96117 11.909C3.18861 13.2646 4.89026 14.0965 6.71399 14.2325C8.53771 14.3684 10.3439 13.798 11.7588 12.6393L15.8274 16.7046C15.8927 16.7701 15.9703 16.8222 16.0558 16.8577C16.1412 16.8933 16.2328 16.9117 16.3253 16.9118C16.4179 16.912 16.5095 16.8939 16.5951 16.8586C16.6806 16.8234 16.7584 16.7716 16.8239 16.7063C16.8895 16.641 16.9415 16.5634 16.9771 16.4779C17.0126 16.3925 17.031 16.3009 17.0312 16.2084C17.0313 16.1159 17.0133 16.0242 16.978 15.9386C16.9427 15.8531 16.891 15.7753 16.8256 15.7098ZM7.24155 12.8326C6.11143 12.8322 5.00681 12.4967 4.06737 11.8685C3.12793 11.2403 2.39585 10.3476 1.96372 9.30341C1.53158 8.25918 1.4188 7.11025 1.63962 6.00192C1.86044 4.89358 2.40496 3.87562 3.20431 3.07674C4.00366 2.27786 5.02196 1.73396 6.13042 1.5138C7.23889 1.29364 8.38775 1.40711 9.43172 1.83987C10.4757 2.27263 11.3679 3.00523 11.9955 3.94505C12.6232 4.88487 12.958 5.98969 12.9577 7.11981C12.9559 8.63497 12.353 10.0875 11.2813 11.1586C10.2096 12.2296 8.75671 12.8317 7.24155 12.8326Z" fill="#22215B" />
                </svg>
                <input className={styles.search__input} type="text" placeholder="Search Folder" />
            </div>
            <ul className={styles.header__list}>
                <li className={styles.header__item}>
                    <a href="/" className={styles.header__button}>
                        <img src={profile} alt="" className={styles.header__icon} />
                        {/* <p className={styles.item__title}>Профиль</p> */}
                    </a>
                </li>
                <li className={styles.header__item}>
                    <a href="/" className={styles.header__button}>
                        <img src={bot} alt="" className={styles.header__icon} />
                        {/* <p className={styles.item__title}>Премиум</p> */}
                    </a>
                </li>
                <li className={styles.header__item}>
                    <a href="/" className={styles.header__button}>
                        <img src={home} alt="" className={styles.header__icon} />
                        {/* <p className={styles.item__title}>Главная</p> */}
                    </a>
                </li>
            </ul>
        </header>
    )
}