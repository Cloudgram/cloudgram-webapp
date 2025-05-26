import Loader from 'react-js-loader';
import styles from './Loader.module.scss';

export interface ILoader {
    type: string;
    bgColor: string;
    color?: string;
    title?: string;
    size: number;
}

export const ButtonLoad = ({ type, bgColor, color, title, size }: ILoader) => {
    return (
        <div className={styles.button__loader}>
            <Loader type={type} bgColor={bgColor} color={color} title={title} size={size} />
        </div>
    );
};
