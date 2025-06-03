export interface FolderFormProps {
    mode: 'create' | 'edit';
    folderId?: string;
    initialData?: {
        title: string;
        color: string;
        parentId?: string;
    };
    onClose: () => void;
}
