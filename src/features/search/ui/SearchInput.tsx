import { Input } from '@chakra-ui/react';

interface SearchInputProps {
    value: string;
    setValue: (value: string) => void;
    setFocus: (value: boolean) => void;
    className?: string;
}

export const SearchInput = ({ value = '', setValue, setFocus, className = '' }: SearchInputProps) => {
    return (
        <Input
            className={className}
            variant={'subtle'}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder='Search'
        />
    );
};
