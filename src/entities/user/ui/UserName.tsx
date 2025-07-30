import styles from './User.module.scss';
import { Text } from '@chakra-ui/react';

interface UserNameProps {
    username?: string;
}

export const UserName = ({ username }: UserNameProps) => {
    return (
        <div className={styles.user__name}>
            <Text>{username}</Text>
        </div>
    );
};
