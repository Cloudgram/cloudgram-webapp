import { ROUTES } from '@/app/Router/routes.config';
import type { FileType } from '@/entities/file/model/fileShema';
import {
    audioExtensions,
    excelExtensions,
    imageExtensions,
    officeExtensions,
    videoExtensions,
    wordExtensions,
} from '@/shared/lib/fileExtensions';

const imageExts = imageExtensions as string[];
const videoExts = videoExtensions as string[];
const audioExts = audioExtensions as string[];
const wordExts = wordExtensions as string[];
const excelExts = excelExtensions as string[];
const officeExts = officeExtensions as string[];

export const CATEGORY_FILTERS = {
    [ROUTES.PRIVATE.FILES.PHOTOS]: (file: FileType) => imageExts.includes(file.extension),
    [ROUTES.PRIVATE.FILES.VIDEOS]: (file: FileType) => videoExts.includes(file.extension),
    [ROUTES.PRIVATE.FILES.AUDIO]: (file: FileType) => audioExts.includes(file.extension),
    [ROUTES.PRIVATE.FILES.DOCUMENTS]: (file: FileType) =>
        wordExts.includes(file.extension) ||
        excelExts.includes(file.extension) ||
        officeExts.includes(file.extension),
    [ROUTES.PRIVATE.FILES.SHARED]: (file: FileType) =>
        ['public', 'limited', 'send'].includes(file.share),
};

export const getFilteredCategoryFiles = (category: string, categoryFiles: FileType[]) => {
    const filter = CATEGORY_FILTERS[category as keyof typeof CATEGORY_FILTERS];
    return filter ? categoryFiles.filter(filter) : [];
};
