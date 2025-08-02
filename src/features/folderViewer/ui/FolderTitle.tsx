import styles from './FolderViewer.module.scss';

interface FolderTitleProps {
    title: string;
}

export const FolderTitle = ({ title }: FolderTitleProps) => {
    return <h1 className={styles.folderViewer__title}>{title}</h1>;
};
