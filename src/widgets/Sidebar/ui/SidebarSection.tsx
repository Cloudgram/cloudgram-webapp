// widgets/Sidebar/ui/SidebarSection.tsx
import { VStack, Text } from '@chakra-ui/react';
import type React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarSectionProps {
    title: string;
    children: React.ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
    return (
        <VStack gap={1} align='stretch' className={styles.sidebar__section}>
            <Text className={styles.sidebar__section_title}>{title}</Text>
            {children}
        </VStack>
    );
};
