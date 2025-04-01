import { UserType } from '../../types/UserType';
import { SearchInput } from '../SearchInput/SearchInput';
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
            <SearchInput />
            <ul className={styles.header__list}>
                <li className={styles.header__item}>
                    <a href="/" className={styles.header__button}>
                        <img src={home} alt="home_page" className={styles.header__icon} />
                    </a>
                </li>
                <li className={styles.header__item}>
                    <a href="/" className={styles.header__button}>
                        <img src={profile} alt="profile_page" className={styles.header__icon} />
                    </a>
                </li>
                <li className={styles.header__item}>
                    <a href="https://t.me/CloudgramWeb_bot" target="_blank" className={styles.header__button}>
                        <img src={bot} alt="bot_link" className={styles.header__icon} />
                    </a>
                </li>
            </ul>
        </header>
    )
}