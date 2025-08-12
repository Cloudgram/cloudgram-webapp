import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import type { CreateSessionPayload, SessionResponse } from '@/features/auth/model/auth.types';
import type { UserType } from '@/entities/user/model/userSchema';
import type { RootFolderType } from '@/entities/folder/model/folderSchema';
import type { apiFolderArgs, createFolderArgs } from '@/entities/folder/types/folder.types';
import type { ColorResponseType, ColorType } from '@/entities/colors/model/colorSchema';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery,
    tagTypes: ['Folders'],
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

        // =========== Folders ===========

        getFolder: builder.query<RootFolderType, apiFolderArgs>({
            query: ({ folderID }) => ({
                url: `/folder/${folderID}`,
                method: 'GET',
            }),
            providesTags: (_result, _error, { folderID }) => [{ type: 'Folders', id: folderID }],
        }),

        createFolder: builder.mutation<void, createFolderArgs>({
            query: ({ parent_folder_id, title, color_id }) => ({
                url: `/folder`,
                method: 'POST',
                body: {
                    parent_folder_id,
                    title,
                    color_id,
                },
            }),
            invalidatesTags: ['Folders'],
        }),

        // =========== Folders ===========

        getColors: builder.query<ColorType[], void>({
            query: () => ({
                url: `/color`,
                method: 'GET',
            }),
            transformResponse: (response: ColorResponseType) => response.data,
        }),
    }),
});

export const {
    useCreateSessionMutation,
    useDeleteSessionMutation,
    useGetUserQuery,
    useGetFolderQuery,
    useCreateFolderMutation,
    useGetColorsQuery,
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
    // useTagFolderMutation,
    // useRemoveTagFolderMutation,
    // useEditFolderMutation,
    // useCopyFolderMutation,
    // useShareFolderMutation,
    // useGetTrashQuery,
    // useDeleteTrashMutation,
    // useMoveToTrashMutation,
    // useRepairTrashMutation,
    // useGetGratitudeQuery,
    // useGetHealthQuery,
} = appApi;
