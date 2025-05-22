import {
    programmingExtensions,
    imageExtensions,
    archiveExtensions,
    wordExtensions,
    excelExtensions,
    powerpointExtensions,
    videoExtensions,
} from '../constants/fileExtensions';

export const getFileColor = (extension: string) => {
    const opacity = 0.2;
    const colorFileTypeMap: Record<string, { backgroundColor: string; color: string }> = {
        pdf: { backgroundColor: `rgba(255, 62, 76, ${opacity})`, color: '#FF3E4C' },
        ppt: { backgroundColor: `rgba(255, 102, 0, ${opacity})`, color: '#FF6600' },
        txt: { backgroundColor: `rgba(0, 0, 0, ${opacity})`, color: '#000000' },
        torrent: { backgroundColor: `rgba(255, 165, 0, ${opacity})`, color: '#FFA500' },
    };

    if (
        programmingExtensions.includes(
            extension.toLowerCase() as (typeof programmingExtensions)[number],
        )
    ) {
        return { backgroundColor: `rgba(0, 0, 255, ${opacity})`, color: '#0000FF' };
    }

    if (imageExtensions.includes(extension.toLowerCase() as (typeof imageExtensions)[number])) {
        return { backgroundColor: `rgba(0, 204, 204, ${opacity})`, color: '#00CCCC' };
    }

    if (wordExtensions.includes(extension.toLowerCase() as (typeof wordExtensions)[number])) {
        return { backgroundColor: `rgba(0, 173, 253, ${opacity})`, color: '#0072FF' };
    }

    if (excelExtensions.includes(extension.toLowerCase() as (typeof excelExtensions)[number])) {
        return { backgroundColor: `rgba(0, 153, 51, ${opacity})`, color: '#009933' };
    }

    if (archiveExtensions.includes(extension.toLowerCase() as (typeof archiveExtensions)[number])) {
        return { backgroundColor: `rgba(153, 51, 255, ${opacity})`, color: '#9933FF' };
    }

    if (
        powerpointExtensions.includes(
            extension.toLowerCase() as (typeof powerpointExtensions)[number],
        )
    ) {
        return { backgroundColor: `rgba(255, 102, 0, ${opacity})`, color: '#FF6600' };
    }

    if (videoExtensions.includes(extension.toLowerCase() as (typeof videoExtensions)[number])) {
        return { backgroundColor: `rgba(255, 0, 0, ${opacity})`, color: '#FF0000' };
    }

    return colorFileTypeMap[extension.toLowerCase()] || null;
};
