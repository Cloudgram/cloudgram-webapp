import { useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.scss';

interface SearchItemProps {
    icon: React.ReactNode;
    title: string;
    items: {
        id: string;
        title: string;
    }[];
}

export const SearchItem = ({ icon, title, items }: SearchItemProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.result}>
            <div className={styles.label}>
                {icon}
                <h3 className={styles['label-name']}>{title}</h3>
            </div>
            <div className={styles.items}>
                {items.map(item => (
                    <div
                        key={item.id}
                        className={styles.item}
                        onClick={() =>
                            title === 'Папки' ? navigate(`/folder/${item.id}`) : undefined
                        }
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};
