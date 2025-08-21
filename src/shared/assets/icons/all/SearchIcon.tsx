import { Icon } from '@chakra-ui/react';

export const SearchIcon = () => {
    return (
        <Icon>
            <svg
                width='15'
                height='15'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle cx='7' cy='7' r='5' stroke='black' strokeOpacity='0.4' strokeWidth='1.5' />
                <line
                    x1='11.2'
                    y1='11.2'
                    x2='15'
                    y2='15'
                    stroke='black'
                    strokeOpacity='0.4'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                />
            </svg>
        </Icon>
    );
};
