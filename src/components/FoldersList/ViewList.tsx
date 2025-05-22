import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ViewType } from '../../constants/view';
import styles from './FoldersList.module.scss';

interface ViewList {
    viewType: ViewType;
    onViewChange: (type: ViewType) => void;
}

export const ViewList: React.FC<ViewList> = ({ viewType, onViewChange }) => {
    return (
        <div className={styles.list__header}>
            <Breadcrumbs />
            <div className={styles.list__orientation}>
                <button
                    className={
                        viewType === ViewType.GRID
                            ? styles.block__orientation_active
                            : styles.block__orientation
                    }
                    onClick={() => onViewChange(ViewType.GRID)}
                >
                    <svg fill='none' width='19' height='19' viewBox='0 0 17 17'>
                        <rect x='0.5' y='0.5' width='8' height='8' stroke='#22215B' />
                        <rect x='0.5' y='8.5' width='8' height='8' stroke='#22215B' />
                        <rect x='8.5' y='0.5' width='8' height='8' stroke='#22215B' />
                        <rect x='8.5' y='8.5' width='8' height='8' stroke='#22215B' />
                    </svg>
                </button>
                <button
                    className={
                        viewType === ViewType.LIST
                            ? styles.line__orientation_active
                            : styles.line__orientation
                    }
                    onClick={() => onViewChange(ViewType.LIST)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fill='white'
                            fillRule='evenodd'
                            d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
