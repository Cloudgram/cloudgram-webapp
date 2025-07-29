import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import type { CreateSessionPayload, SessionResponse } from '@/features/auth/model/authTypes';
import type { UserType } from '@/entities/user/model/userSchema';
import type { RootFolderType } from '@/entities/folder/model/folderSchema';
import type { apiFolderArgs } from '@/entities/folder/types/folderTypes';

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

        // =========== User ===========

        getFolder: builder.query<RootFolderType, apiFolderArgs>({
            query: ({ folderID }) => ({
                url: `/folder/${folderID}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateSessionMutation,
    useDeleteSessionMutation,
    useGetUserQuery,
    useGetFolderQuery,
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
