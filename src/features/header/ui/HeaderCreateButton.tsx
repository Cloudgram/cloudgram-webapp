import styles from './Header.module.scss';
import { useRef, useState } from 'react';
import { UploadIcon } from '@/shared/assets/icons/all/UploadIcon';
import { HeaderActionMenu } from '@/features/header/ui/HeaderActionMenu';
import { Button } from '@chakra-ui/react';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export const HeaderCreateButton = () => {
    const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
    const actionButtonRef = useRef<HTMLButtonElement>(null);

    const actionMenuRef = useClickOutside<HTMLDivElement>(() => setIsActionMenuOpen(false), {
        excludeRefs: [actionButtonRef],
        enabled: isActionMenuOpen,
    });

    const handleOpenActionMenu = () => {
        setIsActionMenuOpen(!isActionMenuOpen);
    };

    return (
        <>
            <Button
                ref={actionButtonRef}
                onClick={handleOpenActionMenu}
                variant='solid'
                colorPalette='blue'
                className={styles.header__button}
            >
                <UploadIcon />
                Create
            </Button>
            <HeaderActionMenu ref={actionMenuRef} isOpen={isActionMenuOpen} />
        </>
    );
};
