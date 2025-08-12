import styles from './CreateFolder.module.scss';
import { Box, Button, Input, InputGroup, Spinner } from '@chakra-ui/react';
import { FolderIconSmall } from '@/shared/assets/icons/FolderIconSmall';
import { useCreateFolderForm } from '../model/useCreateFolderForm';

export const CreateFolderForm = () => {
    const {
        user,
        isLoading,
        colors,
        selectedColor,
        setSelectedColor,
        setFolderTitle,
        handleCreateFolder,
        handleClose,
    } = useCreateFolderForm();

    return (
        <Box className={styles.CreateFolderForm}>
            <h1>New Folder</h1>
            {user?.subscriber &&
                (isLoading ? (
                    <Spinner justifySelf='center' color='teal.500' size='md' />
                ) : (
                    <Box className={styles.CreateFolderForm__container}>
                        {colors?.map(colorItem => (
                            <Box
                                className={styles.CreateFolderForm__container__color}
                                key={colorItem.id}
                                as='button'
                                onClick={() => setSelectedColor(colorItem.id)}
                                bg={colorItem.hex}
                                border={
                                    selectedColor === colorItem.id
                                        ? '2px solid'
                                        : '2px solid transparent'
                                }
                                borderColor={
                                    selectedColor === colorItem.id ? 'gray.900' : 'gray.200'
                                }
                                _hover={{
                                    borderColor:
                                        selectedColor === colorItem.id ? 'gray.900' : 'gray.200',
                                }}
                                title={colorItem.title}
                            />
                        ))}
                    </Box>
                ))}
            <InputGroup
                startElement={
                    <FolderIconSmall
                        color={colors?.find(color => color.id === selectedColor)?.hex || '#497FFF'}
                    />
                }
            >
                <Input placeholder='Folder title' onChange={e => setFolderTitle(e.target.value)} />
            </InputGroup>
            <Box className={styles.CreateFolderForm__buttons}>
                <Button onClick={handleClose} variant={'ghost'} colorPalette={'blue'}>
                    Cancel
                </Button>
                <Button onClick={handleCreateFolder} variant={'ghost'} colorPalette={'blue'}>
                    Create
                </Button>
            </Box>
        </Box>
    );
};
