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
    changeFolder,
    useGetColors,
    ColorType,
    useEffect,
    useUserQuery,
    FormControl,
    FormLabel,
    Box,
} from './index';

interface CreateFolderModalProps {
    onClose: () => void;
    folderId?: string;
    title?: string;
    color_id?: number;
}

export const CreateFolderModal = ({
    onClose,
    folderId,
    title,
    color_id,
}: CreateFolderModalProps) => {
    const [folderTitle, setFolderTitle] = useState<string>(title ?? '');
    const [colors, setColors] = useState<ColorType['data'] | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<number>(color_id ?? 2);
    const currentFolderId = usePathfinder();
    const { data } = useGetColors();
    const { data: user } = useUserQuery();
    const defaultColorId = 2;

    useEffect(() => {
        if (data) {
            setColors(data.data);
        }
    }, [data]);

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            if (folderId) {
                return changeFolder(folderId, currentFolderId, folderTitle, selectedColorId);
            }
            return createFolder(folderTitle, currentFolderId, selectedColorId || defaultColorId);
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
