import { Icon } from '@chakra-ui/react';

interface FolderIconSmallProps {
    color?: string;
}

export const FolderIconSmall = ({ color }: FolderIconSmallProps) => {
    return (
        <Icon>
            <svg
                width='16'
                height='12'
                viewBox='0 0 16 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M0 2.15505C0 0.964848 0.964848 0 2.15505 0H2.46124C3.12669 0 3.72973 0.391898 4 1C4.27027 1.6081 4.87331 2 5.53876 2H12C14.2091 2 16 3.79086 16 6V8C16 10.2091 14.2091 12 12 12H4C1.79086 12 0 10.2091 0 8V2.15505Z'
                    fill={color || '#497FFF'}
                />
            </svg>
        </Icon>
    );
};
