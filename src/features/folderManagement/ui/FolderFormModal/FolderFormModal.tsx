import styles from './FolderFormModal.module.scss';
import { changeFolder, createFolder, getFolders } from '@shared/api/Folders';
import { queryClient } from '@shared/api/queryClient';
import { useGetColors } from '@/shared/hooks/queries/useGetColors';
import { useUserQuery } from '@/shared/hooks/queries/useUserQuery';
import { usePathfinder } from '@/shared/hooks/usePathFinder';
import { ColorType } from '@shared/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ModalWindow } from '@shared/ui/ModalWindow/ui/ModalWindow';
import { ButtonLoad } from '@shared/ui/Loader/ui/ButtonLoad';
import { FormControl, FormLabel, Box } from '@mui/material';
import { FolderFormProps } from '../../model/types';

export const FolderFormModal = ({ mode, folderId, initialData, onClose }: FolderFormProps) => {
    const [folderTitle, setFolderTitle] = useState<string>(initialData?.title ?? '');
    const [colors, setColors] = useState<ColorType['data'] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
        initialData?.color ?? undefined
    );
    const currentFolderId = usePathfinder();
    const { data: colorsData } = useGetColors();
    const { data: user } = useUserQuery();

    const title = mode === 'create' ? 'Создать папку' : 'Изменить папку';
    const buttonText = mode === 'create' ? 'Создать' : 'Сохранить';

    useEffect(() => {
        if (colorsData) {
            setColors(colorsData.data);
        }
    }, [colorsData]);

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            if (folderId) {
                if (user?.subscriber) {
                    return changeFolder(
                        folderId,
                        currentFolderId,
                        folderTitle,
                        selectedColorId ?? undefined
                    );
                } else {
                    return changeFolder(folderId, currentFolderId, folderTitle);
                }
            }
            return createFolder(folderTitle, currentFolderId, selectedColorId ?? 'folder_blue');
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
            queryClient.invalidateQueries({ queryKey: ['searchlist'] });

            await queryClient.prefetchQuery({
                queryKey: ['folders', currentFolderId],
                queryFn: () => getFolders(currentFolderId),
            });

            onClose();
        },
        onError: (error: Error) => {
            if (error.message.includes('premium')) {
                setError('Эта функция доступна только для премиум подписки');
            } else {
                setError(error.message || 'Произошла ошибка');
            }
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
                <h2 className={styles.container__title}>{title}</h2>
                <input
                    type='text'
                    className={styles.container__input}
                    placeholder='Название папки'
                    value={folderTitle}
                    onChange={handleChangeTitle}
                    onKeyDown={handleEnterKey}
                    autoFocus
                />
                {user?.subscriber && (
                    <FormControl
                        sx={{
                            mt: 2,
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            position: 'relative',
                            boxSizing: 'border-box',
                            // width: 'fit-content',
                            '& .MuiFormLabel-root': {
                                position: 'absolute',
                                top: '-12px',
                                left: '10px',
                                padding: '0 5px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                            },
                        }}
                        fullWidth
                    >
                        <FormLabel>Цвет папки</FormLabel>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                borderRadius: '100px',
                                gap: 1,
                                flexWrap: 'wrap',
                                mt: 1,
                            }}
                        >
                            {Array.isArray(colors) &&
                                colors.map(color => (
                                    <button
                                        tabIndex={0}
                                        className={styles.color__button}
                                        key={color.id}
                                        style={{
                                            background: color.hex,
                                            width: '32px',
                                            height: '32px',
                                            border:
                                                selectedColorId === color.id
                                                    ? '2px solid #000'
                                                    : '1px solid #e0e0e0',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            setSelectedColorId(color.id);
                                        }}
                                    />
                                ))}
                        </Box>
                    </FormControl>
                )}
                {error && <p className={styles.error}>{error}</p>}
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
                        ) : (
                            buttonText
                        )}
                    </button>
                </div>
            </div>
        </ModalWindow>
    );
};
