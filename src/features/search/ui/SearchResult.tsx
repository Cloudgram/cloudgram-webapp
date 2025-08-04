import styles from './SearchInput.module.scss';

interface SearchInputProps {
    className?: string;
}

export const SearchResult = ({ className }: SearchInputProps) => {
    return <div className={`${styles.searchResult} ${className}`}></div>;
};
