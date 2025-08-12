import styles from './Header.module.scss';
import { UserAvatar } from '@entities/user/ui/UserAvatar';
import { UserName } from '@entities/user/ui/UserName';
import { UserProfileModal } from '@features/userProfileModal/ui/UserProfileModal';
import { useGetUserQuery } from '@shared/api/appApi';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { Button } from '@chakra-ui/react';
import { useRef, useState } from 'react';

export const HeaderUserProfile = () => {
    const { data: user } = useGetUserQuery();

    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState<boolean>(false);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    const userProfileRef = useClickOutside<HTMLDivElement>(() => setIsUserProfileModalOpen(false), {
        excludeRefs: [userButtonRef],
        enabled: isUserProfileModalOpen,
    });

    const handleOpenUserProfile = () => {
        setIsUserProfileModalOpen(!isUserProfileModalOpen);
    };

    return (
        <>
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
        </>
    );
};
