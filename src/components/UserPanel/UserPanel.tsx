import {
    avatar,
    useUserQuery,
    calcSum,
    cooldownDate,
    dateFormat,
    styles,
    useLogoutMutation,
    ButtonLoad,
    FC,
} from './index';

interface IUserPanel {
    menuRef: React.RefObject<HTMLDivElement>;
}

export const UserPanel: FC<IUserPanel> = ({ menuRef }) => {
    // const uploaded = 10000000000000;
    // console.log(user);
    const { data: user, isLoading, isError } = useUserQuery();
    const { mutate, isPending } = useLogoutMutation();
    const size = 25;

    const handleLogoutClick = () => {
        mutate();
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (isError) return <div>Ошибка загрузки данных</div>;

    return (
        <div className={styles.user} ref={menuRef}>
            <div className={styles.user__container}>
                <div className={styles.user__top}>&#64;{user?.username}</div>
                <div className={styles.user__main}>
                    {user?.avatar ? (
                        <img
                            src={`data:image/jpeg;base64,${user.avatar}`}
                            alt='user icon'
                            className={styles.user__avatar}
                        />
                    ) : (
                        <img
                            src={avatar}
                            alt='user icon'
                            className={styles.user__avatar}
                        />
                    )}
                    {user?.subscriber ? (
                        <span className={styles.user__fullname}>
                            {user?.full_name}
                        </span>
                    ) : (
                        <span className={styles.user__fullname}>
                            {user?.full_name}
                        </span>
                    )}
                    <div className={styles.user__stats}>
                        <div className={styles.user__createdat}>
                            <svg
                                width={size}
                                height={size}
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
                                    stroke='#000000'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            <span className={styles.user__createdat__date}>
                                {dateFormat(user?.created_at || '')}
                            </span>
                        </div>
                        <div className={styles.user__premium}>
                            <svg
                                width={size}
                                height={size}
                                viewBox='0 0 28 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M21.2501 3C21.4925 3 21.7176 3.11688 21.8574 3.30983L21.9119 3.39706L25.9186 10.9098L25.9615 11.0122L25.9731 11.05L25.9901 11.1273L25.9994 11.2153L25.9973 11.3147L26.0001 11.25C26.0001 11.3551 25.9785 11.4552 25.9394 11.5461L25.9106 11.6057L25.87 11.6723L25.8173 11.7408L14.6 24.7047C14.4999 24.8391 14.3628 24.9277 14.2139 24.9703L14.1559 24.9844L14.0585 24.9979L13.9999 25L13.8993 24.9932L13.8142 24.9771L13.7109 24.9432L13.6852 24.931C13.5949 24.8911 13.5119 24.8316 13.4425 24.7535L2.17081 11.7263L2.1087 11.6387L2.06079 11.5456L2.02611 11.4463L2.00297 11.3152L2.00269 11.1878L2.01755 11.0891L2.02714 11.0499L2.06104 10.9538L2.08838 10.8971L6.08838 3.39706C6.20243 3.18321 6.41149 3.0396 6.64753 3.00704L6.75014 3H21.2501ZM17.9061 12H10.0911L14.0011 22.16L17.9061 12ZM8.48514 12H4.38914L11.7621 20.518L8.48514 12ZM23.6081 12H19.5151L16.2421 20.511L23.6081 12ZM10.0241 4.499H7.19914L3.99814 10.5H8.42314L10.0241 4.499ZM16.4231 4.499H11.5761L9.97514 10.5H18.0231L16.4231 4.499ZM20.8001 4.499H17.9751L19.5761 10.5H23.9991L20.8001 4.499Z'
                                    fill='#212121'
                                />
                            </svg>

                            {user?.subscriber ? (
                                <span className={styles.user__premium_end}>
                                    {cooldownDate(user?.subscriber.end || '')}
                                </span>
                            ) : (
                                <span className={styles.user__premium_end}>
                                    У вас нет подписки
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={styles.user__storage}>
                        <svg
                            width={size}
                            height={size}
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g id='File / Cloud'>
                                <path
                                    id='Vector'
                                    d='M19 11C21.2091 11 23 12.7909 23 15C23 17.2091 21.2091 19 19 19L6 19.0001C3.23858 19.0001 1 16.7613 1 13.9999C1 11.3498 3.06206 9.18144 5.66895 9.01082C6.79019 6.64004 9.20335 5 12 5C15.5267 5 18.4447 7.60802 18.9297 11.0006C18.9532 11.0002 18.9764 11 19 11Z'
                                    stroke='#000000'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </g>
                        </svg>
                        {user?.subscriber ? (
                            <span className={styles.user__storage_value}>
                                {`Загружено: ${calcSum(
                                    user?.uploaded_sum ?? 0,
                                )} из `}
                                <svg
                                    fill='#000000'
                                    width={size}
                                    height={size}
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.25 8.5c-2.032 0-3.75 1.895-3.75 3.75S3.218 16 5.25 16c1.017 0 2.014-.457 3.062-1.253.89-.678 1.758-1.554 2.655-2.497-.897-.943-1.765-1.82-2.655-2.497C7.264 8.957 6.267 8.5 5.25 8.5zM12 11.16c-.887-.933-1.813-1.865-2.78-2.6C8.048 7.667 6.733 7 5.25 7 2.343 7 0 9.615 0 12.25s2.343 5.25 5.25 5.25c1.483 0 2.798-.668 3.97-1.56.967-.735 1.893-1.667 2.78-2.6.887.933 1.813 1.865 2.78 2.6 1.172.892 2.487 1.56 3.97 1.56 2.907 0 5.25-2.615 5.25-5.25S21.657 7 18.75 7c-1.483 0-2.798.668-3.97 1.56-.967.735-1.893 1.667-2.78 2.6zm1.033 1.09c.897.943 1.765 1.82 2.655 2.497C16.736 15.543 17.733 16 18.75 16c2.032 0 3.75-1.895 3.75-3.75S20.782 8.5 18.75 8.5c-1.017 0-2.014.457-3.062 1.253-.89.678-1.758 1.554-2.655 2.497z'
                                    />
                                </svg>
                            </span>
                        ) : (
                            <span className={styles.user__storage_value}>
                                Загружено: {calcSum(user?.uploaded_sum ?? 0)} гб
                                из {calcSum(user?.storage_limit ?? 0)}
                            </span>
                        )}
                    </div>
                    <button
                        className={styles.user__logout}
                        onClick={() => handleLogoutClick()}
                    >
                        {isPending ? (
                            <ButtonLoad
                                type='spinner-circle'
                                bgColor={'black'}
                                size={40}
                            />
                        ) : (
                            'Выйти'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
