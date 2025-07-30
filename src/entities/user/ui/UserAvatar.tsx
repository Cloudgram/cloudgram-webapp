import { Avatar } from '@chakra-ui/react';
import type { UserType } from '../model/userSchema';
import styles from './User.module.scss';

interface UserAvatarProps {
    userData?: UserType;
    className?: string;
}

export const UserAvatar = ({ userData, className }: UserAvatarProps) => {
    return (
        <Avatar.Root className={styles.user__avatar ?? className}>
            <Avatar.Fallback fontSize={'0.875rem'} name={userData?.full_name} />
            <Avatar.Image src={userData?.avatar_url || ''} alt={userData?.full_name} />
        </Avatar.Root>
    );
};
