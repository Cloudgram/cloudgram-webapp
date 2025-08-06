import { Button, Stack } from '@chakra-ui/react';
import styles from './ActionMenu.module.scss';
import type { ActionMenuProps } from './ActionMenu.types';
import React from 'react';

export const ActionMenu = React.forwardRef<HTMLDivElement, ActionMenuProps>(
    ({ items, isOpen }, ref) => {
        return (
            <Stack ref={ref} display={isOpen ? 'flex' : 'none'} className={styles.actionMenu}>
                {items.map((item, index) => (
                    <Button
                        justifyContent={'flex-start'}
                        variant={'ghost'}
                        key={index}
                        onClick={item.onClick}
                        paddingLeft={'10px'}
                        paddingRight={'10px'}
                    >
                        {item.icon}
                        {item.label}
                    </Button>
                ))}
            </Stack>
        );
    }
);
