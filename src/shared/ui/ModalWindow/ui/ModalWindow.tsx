import { createPortal } from 'react-dom';
import styles from './ModalWindow.module.scss';

interface ModalWindowProps {
    children: React.ReactNode;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
    return createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.modal__container}>{children}</div>
            </div>
        </>,
        document.body
    );
};
