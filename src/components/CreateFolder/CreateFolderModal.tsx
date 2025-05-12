import { changeFolder } from '../../api/Folders';
import { useGetColors } from '../../hooks/queries/useGetColors';
import {
    useState,
    styles,
    createFolder,
    useMutation,
    ModalWindow,
    queryClient,
    usePathfinder,
    getFolders,
    ButtonLoad,
} from './index';
import { ColorType } from '../../types/color';
import { useEffect } from 'react';
import { isPremium } from '../../utils/isPremium';

interface CreateFolderModalProps {
    onClose: () => void;
    folderId?: string;
    title?: string;
    color_id: number;
}

export const CreateFolderModal = ({
    onClose,
    folderId,
    title,
    color_id,
}: CreateFolderModalProps) => {
    const [folderTitle, setFolderTitle] = useState<string>(title ?? '');
    const [colors, setColors] = useState<ColorType['data'] | null>(null);
    const [selectedColor, setSelectedColor] = useState<number>(color_id);
    const currentFolderId = usePathfinder();
    const { data } = useGetColors();

    useEffect(() => {
        if (data) {
            setColors(data.data);
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            if (folderId) {
                return changeFolder(folderId, currentFolderId, folderTitle, selectedColor);
            }
            return createFolder(folderTitle, currentFolderId, selectedColor | 2);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });

            await queryClient.prefetchQuery({
                queryKey: ['folders', currentFolderId],
                queryFn: () => getFolders(currentFolderId),
            });

            onClose();
        },
        onError: (error: Error) => {
            console.error(error);
        },
    });

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderTitle(e.target.value);
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            mutate();
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    const handleCreateFolder = () => {
        mutate();
    };

    return (
        <ModalWindow>
            <div className={styles.container}>
                <h2 className={styles.container__title}>
                    {title ? 'Изменить папку' : 'Создать папку'}
                </h2>
                <input
                    type='text'
                    className={styles.container__input}
                    placeholder='Название папки'
                    value={folderTitle}
                    onChange={handleChangeTitle}
                    onKeyDown={handleEnterKey}
                    autoFocus
                />
                {isPremium() && (
                    <div className={styles.folder__colors}>
                        {Array.isArray(colors) &&
                            colors.map((color, index) => (
                                <button
                                    className={styles.color__button}
                                    key={index}
                                    style={{ background: color.hex }}
                                    onClick={() => setSelectedColor(color.id)}
                                />
                            ))}
                    </div>
                )}
                <div className={styles.container__buttons}>
                    <button className={styles.cancel__button} onClick={onClose}>
                        Отмена
                    </button>
                    <button
                        className={styles.create__button}
                        disabled={!folderTitle?.trim()}
                        onClick={handleCreateFolder}
                    >
                        {isPending ? (
                            <ButtonLoad
                                type='bubble-loop'
                                bgColor='black'
                                color='black'
                                size={40}
                            />
                        ) : title && folderId ? (
                            'Изменить'
                        ) : (
                            'Создать'
                        )}
                    </button>
                </div>
            </div>
        </ModalWindow>
    );
};
