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
                        {userData?.subscriber ? (
                            <Card.Description display={'flex'} gap={'7px'} flexWrap={'nowrap'}>
                                Used: {`${calcSum(userData?.uploaded_sum ?? 0)} of`}
                                <svg
                                    fill='#000000'
                                    width={'20px'}
                                    height={'20px'}
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M5.25 8.5c-2.032 0-3.75 1.895-3.75 3.75S3.218 16 5.25 16c1.017 0 2.014-.457 3.062-1.253.89-.678 1.758-1.554 2.655-2.497-.897-.943-1.765-1.82-2.655-2.497C7.264 8.957 6.267 8.5 5.25 8.5zM12 11.16c-.887-.933-1.813-1.865-2.78-2.6C8.048 7.667 6.733 7 5.25 7 2.343 7 0 9.615 0 12.25s2.343 5.25 5.25 5.25c1.483 0 2.798-.668 3.97-1.56.967-.735 1.893-1.667 2.78-2.6.887.933 1.813 1.865 2.78 2.6 1.172.892 2.487 1.56 3.97 1.56 2.907 0 5.25-2.615 5.25-5.25S21.657 7 18.75 7c-1.483 0-2.798.668-3.97 1.56-.967.735-1.893 1.667-2.78 2.6zm1.033 1.09c.897.943 1.765 1.82 2.655 2.497C16.736 15.543 17.733 16 18.75 16c2.032 0 3.75-1.895 3.75-3.75S20.782 8.5 18.75 8.5c-1.017 0-2.014.457-3.062 1.253-.89.678-1.758 1.554-2.655 2.497z'
                                    />
                                </svg>
                            </Card.Description>
                        ) : (
                            <Card.Description display={'flex'} gap={'7px'} flexWrap={'nowrap'}>
                                Used:{' '}
                                {`${calcSum(userData?.uploaded_sum ?? 0)} of ${calcSum(
                                    userData?.storage_limit ?? 0
                                )}`}
                            </Card.Description>
                        )}
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
