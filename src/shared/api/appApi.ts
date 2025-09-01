import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import type { CreateSessionPayload, SessionResponse } from '@features/auth/model/auth.types';
import type { UserType } from '@entities/user/model/userSchema';
import type { RootFolderType } from '@entities/folder/model/folderSchema';
import type { apiFolderArgs, createFolderArgs } from '@entities/folder/types/folder.types';
import type { ColorResponseType, ColorType } from '@entities/colors/model/colorSchema';
import type {
    FSItemsArgs,
    FSItemsResponseType,
    InitFileArgs,
    InitFileResponse,
} from '@entities/file/types/file.types';
import type { FileType } from '@/entities/file/model/fileSchema';
import type { SearchItemResponseType, SearchItemType } from '@/features/search/model/search.types';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery,
    tagTypes: ['Folders', 'FS_Files'],
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

        // =========== Files ===========

        initFileUpload: builder.mutation<InitFileResponse, InitFileArgs>({
            query: body => ({
                url: '/file',
                method: 'POST',
                body,
            }),
        }),

        uploadFilePreview: builder.mutation<void, { file_id: string; preview: Blob }>({
            query: ({ file_id, preview }) => {
                const formData = new FormData();
                formData.append('preview', preview, 'preview.jpg');
                return {
                    url: `/file/${file_id}/preview`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        uploadFileChunk: builder.mutation<void, { file_id: string; chunk: Blob }>({
            query: ({ file_id, chunk }) => {
                const formData = new FormData();
                formData.append('chunk', chunk);

                return {
                    url: `/file/${file_id}/chunk`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        getFilePreview: builder.query<string | null, { preview_id: string | null }>({
            query: ({ preview_id }) => ({
                url: `/file/${preview_id}`,
                method: 'GET',
                responseHandler: async response => {
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                },
            }),
        }),

        // =========== Colors ===========

        getColors: builder.query<ColorType[], void>({
            query: () => ({
                url: `/color`,
                method: 'GET',
            }),
            transformResponse: (response: ColorResponseType) => response.data,
        }),

        // =========== Filters ===========

        getAllFiles: builder.query<FileType[], FSItemsArgs>({
            query: args => {
                const params = new URLSearchParams(args as Record<string, string>).toString();
                console.log(params);
                return {
                    url: `/user/fs_items?${params}`,
                    method: 'GET',
                };
            },
            providesTags: () => [{ type: 'FS_Files' }],
            transformResponse: (response: FSItemsResponseType) => response.data,
        }),

        getSearchResults: builder.query<SearchItemType[], FSItemsArgs>({
            query: args => {
                const params = new URLSearchParams(args as Record<string, string>).toString();
                console.log(params);
                return {
                    url: `/user/fs_items?${params}`,
                    method: 'GET',
                };
            },
            providesTags: () => [{ type: 'FS_Files' }],
            transformResponse: (response: SearchItemResponseType) => response.data,
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
    useInitFileUploadMutation,
    useUploadFileChunkMutation,
    useUploadFilePreviewMutation,
    useGetFilePreviewQuery,
    useGetAllFilesQuery,
    useGetSearchResultsQuery,
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
