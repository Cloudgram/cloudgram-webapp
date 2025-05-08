import styles from './AuthPage.module.scss';
import { getAuth } from '../../api/Auth';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { AuthCodeInput } from '../../components/AuthCodeInput/AuthCodeInput';
import { ButtonLoad } from '../../components/Loader/ButtonLoad';
import { useAuthMutation } from '../../hooks/mutations/useAuthMutation';
export {
    styles,
    getAuth,
    AxiosError,
    useState,
    useNavigate,
    useMutation,
    queryClient,
    AuthCodeInput,
    ButtonLoad,
    useAuthMutation,
};
