import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type SessionResponse = {
    success: boolean;
};

export type ErrorResponse = {
    detail: {
        msg: string;
    };
};

export type CreateSessionPayload = {
    secret: string;
};

export type AuthError = FetchBaseQueryError & {
    data: ErrorResponse;
};
