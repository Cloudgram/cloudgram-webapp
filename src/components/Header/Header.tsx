import { Link } from 'react-router-dom';
import { useUserQuery } from '../../hooks/queries/useUserQuery';
import { queryClient, useClickOutside, usePathfinder } from '../Filters';
import { SearchInput } from '../SearchInput/SearchInput';
import { UserPanel } from '../UserPanel/UserPanel';

import { avatar, styles, useState } from './index';
import { rootFolderId } from '../../constants/rootFolder';
import { useAppDispatch, useAppSelectot } from '../../store/store';
import { FILTERS } from '../../constants/filters';

export const Header = () => {
    const { data: user } = useUserQuery();
    const [userPanel, setUserPanel] = useState(false);
    const path = usePathfinder();
    const atHome = path === rootFolderId;
    const size = 25;

    const filter = useAppSelectot(state => state.filter);
    const dispatch = useAppDispatch();

    const closeCard = () => {
        setUserPanel(false);
    };
    const cardRef = useClickOutside(closeCard);

    const toggleUserPanel = () => {
        setUserPanel(!userPanel);
    };

    const handleGoHome = () => {
        dispatch({
            type: FILTERS.HOME,
            payload: {
                filter: FILTERS.HOME,
            },
        });
        queryClient.invalidateQueries({ queryKey: ['folders'] });
        localStorage.removeItem('folderHistory');
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__left}>
                <div className={styles.header__user} onClick={() => toggleUserPanel()}>
                    <div className={styles.icon__container}>
                        {user?.avatar ? (
                            <img
                                src={`data:image/jpeg;base64,${user.avatar}`}
                                alt='user icon'
                                className={styles.user__icon}
                            />
                        ) : (
                            <img src={avatar} alt='user icon' className={styles.user__icon} />
                        )}
                    </div>
                    <div className={styles.header__username}>
                        <span className={styles.full__name}>
                            {user?.full_name}
                            {user?.subscriber && (
                                <svg
                                    width='23'
                                    height='23'
                                    viewBox='0 0 28 28'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M21.2501 3C21.4925 3 21.7176 3.11688 21.8574 3.30983L21.9119 3.39706L25.9186 10.9098L25.9615 11.0122L25.9731 11.05L25.9901 11.1273L25.9994 11.2153L25.9973 11.3147L26.0001 11.25C26.0001 11.3551 25.9785 11.4552 25.9394 11.5461L25.9106 11.6057L25.87 11.6723L25.8173 11.7408L14.6 24.7047C14.4999 24.8391 14.3628 24.9277 14.2139 24.9703L14.1559 24.9844L14.0585 24.9979L13.9999 25L13.8993 24.9932L13.8142 24.9771L13.7109 24.9432L13.6852 24.931C13.5949 24.8911 13.5119 24.8316 13.4425 24.7535L2.17081 11.7263L2.1087 11.6387L2.06079 11.5456L2.02611 11.4463L2.00297 11.3152L2.00269 11.1878L2.01755 11.0891L2.02714 11.0499L2.06104 10.9538L2.08838 10.8971L6.08838 3.39706C6.20243 3.18321 6.41149 3.0396 6.64753 3.00704L6.75014 3H21.2501ZM17.9061 12H10.0911L14.0011 22.16L17.9061 12ZM8.48514 12H4.38914L11.7621 20.518L8.48514 12ZM23.6081 12H19.5151L16.2421 20.511L23.6081 12ZM10.0241 4.499H7.19914L3.99814 10.5H8.42314L10.0241 4.499ZM16.4231 4.499H11.5761L9.97514 10.5H18.0231L16.4231 4.499ZM20.8001 4.499H17.9751L19.5761 10.5H23.9991L20.8001 4.499Z'
                                        fill='#212121'
                                    />
                                </svg>
                            )}
                        </span>
                        <span className={styles.user__name}>{`@${user?.username}`}</span>
                    </div>
                </div>
            </div>
            {userPanel && <UserPanel cardRef={cardRef} />}
            <SearchInput />
            <ul className={styles.header__list}>
                <li className={styles.header__item}>
                    <Link onClick={handleGoHome} to='/my-drive' className={styles.header__button}>
                        {atHome && filter === FILTERS.HOME ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={size}
                                height={size}
                                viewBox='0 0 16 16'
                            >
                                <g fill='currentColor'>
                                    <path d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z' />
                                    <path d='m8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z' />
                                </g>
                            </svg>
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={size}
                                height={size}
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fill='currentColor'
                                    d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z'
                                />
                            </svg>
                        )}
                    </Link>
                </li>
                <li className={styles.header__item}>
                    <Link
                        to='https://t.me/CloudgramWeb_bot'
                        target='_blank'
                        className={styles.header__button}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={size}
                            height={size}
                            viewBox='0 0 16 16'
                        >
                            <g fill='currentColor'>
                                <path d='M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183a.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736l.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188a.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785l-.842-1.7a.25.25 0 0 0-.182-.135' />
                                <path d='M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5' />
                            </g>
                        </svg>
                    </Link>
                </li>
            </ul>
        </header>
    );
};
