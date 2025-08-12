import styles from './Header.module.scss';
import { useCurrentSectionLabel } from '@shared/hooks/useCurrentSectionLabel';
import { Icon } from '@chakra-ui/react';

export const HeaderTitle = () => {
    const pageTitle = useCurrentSectionLabel();

    return (
        <h1 className={styles.header__title}>
            {(pageTitle?.icon && <pageTitle.icon />) ?? (
                <Icon size={'lg'}>
                    <img src='/favicon.ico' alt='' />
                </Icon>
            )}
            {pageTitle?.label ?? 'Cloudgram'}
        </h1>
    );
};
