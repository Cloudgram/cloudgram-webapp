import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import type { CreateSessionPayload, SessionResponse } from '@/features/auth/model/authTypes';
import type { UserType } from '@entities/user/model/schema';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery,
    endpoints: builder => ({
        createSession: builder.mutation<SessionResponse, CreateSessionPayload>({
            query: ({ secret }) => ({
                url: '/session',
                method: 'POST',
                body: { secret },
            }),
        }),
        deleteSession: builder.mutation<void, void>({
            query: () => ({
                url: '/session',
                method: 'DELETE',
            }),
        }),

        // =========== User ===========

        getUser: builder.query<UserType, void>({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateSessionMutation,
    useDeleteSessionMutation,
    useGetUserQuery,
    // useGetFsItemsQuery,
    // useInitFileUploadMutation,
    // useUploadFilePreviewMutation,
    // useUploadFileChunkMutation,
    // useDownloadFileQuery,
    // useTagFileMutation,
    // useRemoveTagFileMutation,
    // useEditFileMutation,
    // useCopyFileMutation,
    // useShareFileMutation,
    // useCreateFolderMutation,
    // useGetFolderQuery,
    // useTagFolderMutation,
    // useRemoveTagFolderMutation,
    // useEditFolderMutation,
    // useCopyFolderMutation,
    // useShareFolderMutation,
    // useGetTrashQuery,
    // useDeleteTrashMutation,
    // useMoveToTrashMutation,
    // useRepairTrashMutation,
    // useGetColorsQuery,
    // useGetGratitudeQuery,
    // useGetHealthQuery,
} = appApi;
