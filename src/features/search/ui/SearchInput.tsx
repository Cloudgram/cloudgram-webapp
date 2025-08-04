import { Input } from '@chakra-ui/react';

interface SearchInputProps {
    className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
    return <Input className={className} variant={'subtle'} placeholder='Search' />;
};
