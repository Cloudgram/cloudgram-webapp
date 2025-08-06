import { Button, Icon } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { UploadIcon } from '@shared/assets/icons/UploadIcon';
import { useGetUserQuery } from '@shared/api/appApi';
import { UserAvatar } from '@entities/user/ui/UserAvatar';
import { UserName } from '@entities/user/ui/UserName';
import { UserProfileModal } from '@features/userProfileModal/ui/UserProfileModal';
import { SearchWidget } from '../Search/SearchWidget';
import { isSearchInHeader } from '@shared/lib/isSearchInHeader';
import { useCurrentSectionLabel } from '@shared/hooks/useCurrentSectionLabel';
import { ActionMenu } from '@/shared/components/ActionMenu/ActionMenu';
import { actionItems } from './model/actionsConfig';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export const Header = () => {
    const { data: user } = useGetUserQuery();
    const { pathname } = useLocation();
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState<boolean>(false);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
    const shouldShowSearchInHeader = isSearchInHeader(pathname);
    const pageTitle = useCurrentSectionLabel();

    const actionButtonRef = useRef<HTMLButtonElement>(null);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    const actionMenuRef = useClickOutside<HTMLDivElement>(() => setIsActionMenuOpen(false), {
        excludeRefs: [actionButtonRef],
        enabled: isActionMenuOpen,
    });

    const userProfileRef = useClickOutside<HTMLDivElement>(() => setIsUserProfileModalOpen(false), {
        excludeRefs: [userButtonRef],
        enabled: isUserProfileModalOpen,
    });

    const handleOpenUserProfile = () => {
        setIsUserProfileModalOpen(!isUserProfileModalOpen);
    };

    const handleOpenActionMenu = () => {
        setIsActionMenuOpen(!isActionMenuOpen);
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
                    <Button
                        ref={actionButtonRef}
                        onClick={handleOpenActionMenu}
                        variant='solid'
                        colorPalette='blue'
                        className={styles.header__button}
                    >
                        <UploadIcon />
                        Create
                    </Button>
                    <ActionMenu ref={actionMenuRef} items={actionItems} isOpen={isActionMenuOpen} />
                    <Button
                        ref={userButtonRef}
                        colorPalette={'ghost'}
                        onClick={handleOpenUserProfile}
                        className={styles.header__user}
                        aria-label='Open user profile'
                    >
                        <UserAvatar userData={user} />
                        <UserName username={user?.full_name} />
                    </Button>
                    <UserProfileModal
                        ref={userProfileRef}
                        isOpen={isUserProfileModalOpen}
                        userData={user}
                    />
                </div>
            </div>
        </div>
    );
};
