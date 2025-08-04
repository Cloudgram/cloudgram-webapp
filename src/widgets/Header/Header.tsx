import { Button, Icon } from '@chakra-ui/react';
import styles from './Header.module.scss';
import { UploadIcon } from '@shared/assets/icons/UploadIcon';
import { useGetUserQuery } from '@shared/api/appApi';
import { UserAvatar } from '@entities/user/ui/UserAvatar';
import { UserName } from '@entities/user/ui/UserName';
import { UserProfileModal } from '@features/userProfileModal/ui/UserProfileModal';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchWidget } from '../Search/SearchWidget';
import { isSearchInHeader } from '@shared/lib/isSearchInHeader';
import { useCurrentSectionLabel } from '@shared/hooks/useCurrentSectionLabel';

export const Header = () => {
    const { data: user } = useGetUserQuery();
    const { pathname } = useLocation();
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState<boolean>(false);
    const shouldShowSearchInHeader = isSearchInHeader(pathname);
    const pageTitle = useCurrentSectionLabel();

    const handleOpenUserProfile = () => {
        setIsUserProfileModalOpen(!isUserProfileModalOpen);
    };

    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__left}>
                    <h1 className={styles.header__title}>
                        {(pageTitle?.icon && <pageTitle.icon />) ?? (
                            <Icon size={'lg'}>
                                <img src='/favicon.ico' alt='' />
                            </Icon>
                        )}
                        {pageTitle?.label ?? 'Cloudgram'}
                    </h1>
                </div>
                {shouldShowSearchInHeader && (
                    <div className={styles.header__search}>
                        <SearchWidget searchInputClassName={styles.header__search__input} />
                    </div>
                )}
                <div className={styles.header__right}>
                    <Button variant='solid' colorPalette='blue' className={styles.header__button}>
                        <UploadIcon />
                        Upload File
                    </Button>
                    <Button variant='solid' colorPalette='blue' className={styles.header__button}>
                        <UploadIcon />
                        Create Folder
                    </Button>
                    <Button
                        colorPalette={'ghost'}
                        onClick={handleOpenUserProfile}
                        className={styles.header__user}
                        aria-label='Open user profile'
                    >
                        <UserAvatar userData={user} />
                        <UserName username={user?.full_name} />
                    </Button>
                    <UserProfileModal isOpen={isUserProfileModalOpen} userData={user} />
                </div>
            </div>
        </div>
    );
};
