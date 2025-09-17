export const createFolderMenuActions = (folderID: string) => {
    return [
        {
            content: 'Переименовать',
            onClick: () => console.log('rename', folderID),
        },
        {
            content: 'Скачать',
            onClick: () => console.log('download', folderID),
        },
        {
            content: 'В избранное',
            onClick: () => console.log('favorite', folderID),
        },
        {
            content: 'Поделиться',
            onClick: () => console.log('share', folderID),
        },
        {
            content: 'Переместить',
            onClick: () => console.log('move', folderID),
        },
        {
            content: 'Копировать',
            onClick: () => console.log('copy', folderID),
        },
        {
            content: 'В корзину',
            onClick: () => console.log('delete', folderID),
        },
    ];
};
