import { Avatar, Button, Card, Stack } from '@chakra-ui/react';
import styles from './UserProfileModal.module.scss';
import type { UserType } from '@/entities/user/model/userSchema';
import { dateFormat } from '@/shared/lib/formatDate';
import { calcSum } from '@/shared/lib/formatUploadSum';
import { useLogout } from '@/features/auth/model/logout';
import React from 'react';

interface UserProfileModalProps {
    userData?: UserType;
    isOpen?: boolean;
}

export const UserProfileModal = React.forwardRef<HTMLDivElement, UserProfileModalProps>(
    ({ userData, isOpen }, ref) => {
        const { logout, isLoading } = useLogout();

        return (
            <Card.Root
                ref={ref}
                zIndex={2}
                display={isOpen ? 'block' : 'none'}
                className={styles.userProfileModal}
            >
                <Card.Body p='20px' gap={4} flexDirection='column'>
                    <Stack
                        className={
                            userData?.subscriber ? styles.userProfileModal__avatar__premium : ''
                        }
                        alignItems='center'
                        flexDirection='row'
                    >
                        <Avatar.Root
                            className={styles.userProfileModal__avatar}
                            size='2xl'
                            shape='rounded'
                        >
                            <Avatar.Image src={userData?.avatar_url || ''} />
                            <Avatar.Fallback name={userData?.full_name} />
                        </Avatar.Root>
                        <Stack gap='0'>
                            <Card.Title fontWeight='10px'>{userData?.full_name}</Card.Title>
                            <Card.Description
                                color={userData?.subscriber ? 'white' : ''}
                                fontSize='12px'
                            >
                                {userData?.subscriber
                                    ? `Premium until: ${dateFormat(userData.subscriber.end)}`
                                    : 'No subscription'}
                            </Card.Description>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Card.Description>
                            Registration date:{' '}
                            {userData?.created_at ? dateFormat(userData.created_at) : 'Не указана'}
                        </Card.Description>
                        <Card.Description>
                            Used:{' '}
                            {userData?.upload_sum
                                ? `${calcSum(userData.upload_sum)} of 50GB`
                                : 'Not specified'}
                        </Card.Description>
                    </Stack>
                </Card.Body>
                <Card.Footer p='0 20px 20px 20px' justifyContent='flex-start'>
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={logout}
                        variant='ghost'
                        colorPalette={'red'}
                    >
                        Logout
                    </Button>
                </Card.Footer>
            </Card.Root>
        );
    }
);
