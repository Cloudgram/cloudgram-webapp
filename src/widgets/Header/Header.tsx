import { Button } from '@chakra-ui/react';
import styles from './Header.module.scss';
import { UploadIcon } from '@/shared/assets/icons/UploadIcon';
import { useGetUserQuery } from '@shared/api/appApi';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { UserName } from '@/entities/user/ui/UserName';

export const Header = () => {
    const { data: user } = useGetUserQuery();

    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__left}>
                    <h1 className={styles.header__title}>
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M7.29297 0.293C7.4805 0.105529 7.73481 0.000213623 7.99997 0.000213623C8.26513 0.000213623 8.51944 0.105529 8.70697 0.293L15.707 7.293C15.8468 7.43285 15.942 7.61102 15.9806 7.80497C16.0191 7.99892 15.9993 8.19995 15.9236 8.38265C15.848 8.56535 15.7198 8.72152 15.5554 8.8314C15.391 8.94129 15.1977 8.99996 15 9H14V15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5195 15.8946 13.2652 16 13 16H11C10.7348 16 10.4804 15.8946 10.2929 15.7071C10.1053 15.5196 9.99997 15.2652 9.99997 15V12C9.99997 11.7348 9.89461 11.4804 9.70708 11.2929C9.51954 11.1054 9.26519 11 8.99997 11H6.99997C6.73475 11 6.4804 11.1054 6.29286 11.2929C6.10533 11.4804 5.99997 11.7348 5.99997 12V15C5.99997 15.2652 5.89461 15.5196 5.70708 15.7071C5.51954 15.8946 5.26519 16 4.99997 16H2.99997C2.73475 16 2.4804 15.8946 2.29286 15.7071C2.10533 15.5196 1.99997 15.2652 1.99997 15V9H0.99997C0.80222 8.99996 0.608921 8.94129 0.444511 8.8314C0.280102 8.72152 0.151962 8.56535 0.0762921 8.38265C0.000622056 8.19995 -0.019181 7.99892 0.0193866 7.80497C0.0579541 7.61102 0.153161 7.43285 0.29297 7.293L7.29297 0.293Z'
                                fill='#497FFF'
                            />
                        </svg>
                        Home
                    </h1>
                </div>
                <div className={styles.header__right}>
                    <Button variant='solid' colorPalette='blue' className={styles.header__button}>
                        <UploadIcon />
                        Upload File
                    </Button>
                    <Button variant='solid' colorPalette='blue' className={styles.header__button}>
                        <UploadIcon />
                        Create Folder
                    </Button>
                    <div className={styles.header__user}>
                        <UserAvatar userData={user} />
                        <UserName username={user?.full_name} />
                    </div>
                </div>
            </div>
        </div>
    );
};
