import Loader from 'react-js-loader';
import styles from './Loader.module.scss';

export interface ILoader {
    type: string;
    bgColor: string;
    color?: string;
    title?: string;
    size: number;
    className?: string;
}

export const ButtonLoad = ({ type, bgColor, color, title, size, className }: ILoader) => {
    return (
        <div className={className ?? styles.button__loader}>
            <Loader type={type} bgColor={bgColor} color={color} title={title} size={size} />
        </div>
    );
};
