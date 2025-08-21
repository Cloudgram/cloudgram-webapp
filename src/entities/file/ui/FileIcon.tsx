import { Icons } from '@/shared/assets/icons';
import { getFileIconName } from '@/shared/lib/fileExtensions';

type FileIconProps = {
    extension: string;
    size: number;
};

export const FileIcon = ({ extension, size }: FileIconProps) => {
    const Icon = Icons[getFileIconName(extension.toLowerCase())];
    return <Icon width={size} height={size} />;
};
