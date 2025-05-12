import styles from './FoldersList.module.scss';
import { getFolders, deleteFolder } from '../../api/Folders';
import { dateFormat } from '../../utils/formatDate';
import { Filters } from '../Filters/Filters';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { queryClient } from '../../api/queryClient';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { useClickOutside } from '../../hooks/state/useClickOutside';
import { getFileIcon } from '../../utils/getFileIcon';
import { getFileColor } from '../../utils/getFileColor';
import { animateFileActionMenu } from '../../utils/animations/ActionsMenuAnimation';
import { useNavigate } from 'react-router-dom';
import { deleteFile, downloadFile } from '../../api/Files';
import { usePathfinder } from '../CreateFolder';
import { useFoldersQuery } from '../../hooks/queries/useFolderQuery';
import { RootFolderType } from '../../types/RootType';
import { ViewType } from '../../types/view';
import { ViewList } from './ViewList';
import { FileItem } from './FileItem';
import { FolderItem } from './FolderItem';
import { FC } from 'react';
import { CreateFolderModal } from '../CreateFolder/CreateFolderModal';
import { useDragAndDrop } from '../../hooks/state/useDragAndDrop';

export {
    styles,
    getFolders,
    dateFormat,
    Filters,
    useEffect,
    useState,
    Link,
    queryClient,
    deleteFolder,
    ActionMenu,
    useClickOutside,
    getFileIcon,
    getFileColor,
    animateFileActionMenu,
    deleteFile,
    downloadFile,
    useNavigate,
    usePathfinder,
    useFoldersQuery,
    ViewType,
    FileItem,
    FolderItem,
    ViewList,
    CreateFolderModal,
    useDragAndDrop,
};

export type { RootFolderType, FC };
