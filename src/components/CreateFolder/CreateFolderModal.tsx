import { useState, styles, createFolder, useMutation, ModalWindow, useParams, queryClient } from './index'

interface CreateFolderModalProps {
    onClose: () => void;
}

export const CreateFolderModal = ({ onClose }: CreateFolderModalProps) => {
    const [title, setTitle] = useState<string>('');
    const { folderId = '' } = useParams();

    const createFolderMutation = useMutation({
        mutationFn: () => createFolder(title, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
            onClose();
        },
        onError: (error: Error) => {
            console.error(error);
        }

    })

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleCreateFolder = () => {
        createFolderMutation.mutate();
    }

    return (
        <ModalWindow>
            <div className={styles.container}>
                <h2 className={styles.container__title}>Новая папка</h2>
                <input
                    type="text"
                    className={styles.container__input}
                    placeholder='Название папки'
                    value={title}
                    onChange={handleChangeTitle}
                />
                <div className={styles.container__buttons}>
                    <button
                        className={styles.cancel__button}
                        onClick={onClose}
                    >Отмена</button>
                    <button
                        className={styles.create__button}
                        disabled={!title?.trim()}
                        onClick={handleCreateFolder}
                    >Создать</button>
                </div>
            </div>
        </ModalWindow>
    )
}