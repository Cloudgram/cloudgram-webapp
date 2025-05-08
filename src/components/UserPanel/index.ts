import avatar from '../../img/user-icon.png';
import { useMutation } from '@tanstack/react-query';
import { logoutSession } from '../../api/Auth';
import { useUserQuery } from '../../hooks/queries/useUserQuery';
import { calcSum } from '../../utils/calcSumUpload';
import { cooldownDate } from '../../utils/cooldownDate';
import { dateFormat, queryClient, useNavigate } from '../FoldersList';
import styles from './UserPanel.module.scss';
import { AxiosError } from 'axios';
import { useLogoutMutation } from '../../hooks/mutations/useLogoutMutation';
import { ButtonLoad } from '../Loader/ButtonLoad';
import { FC } from 'react';

export {
    avatar,
    useMutation,
    logoutSession,
    useUserQuery,
    calcSum,
    cooldownDate,
    dateFormat,
    queryClient,
    useNavigate,
    styles,
    AxiosError,
    useLogoutMutation,
    ButtonLoad,
};
export type { FC };
