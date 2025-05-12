import {
    programmingExtensions,
    imageExtensions,
    archiveExtensions,
    wordExtensions,
    excelExtensions,
    powerpointExtensions,
    videoExtensions,
    exeExtension,
} from '../constants/fileExtensions';

export const getFileIcon = (extension: string) => {
    const size = 35;

    const fileTypeMap: Record<string, JSX.Element> = {
        pdf: (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <g fill='currentColor'>
                    <path d='M5.523 10.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36c.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05a12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064a.44.44 0 0 1-.06.2a.3.3 0 0 1-.094.124a.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 4.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822c.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z' />
                    <path
                        fillRule='evenodd'
                        d='M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m.165 11.668c.09.18.23.343.438.419c.207.075.412.04.58-.03c.318-.13.635-.436.926-.786c.333-.401.683-.927 1.021-1.51a11.6 11.6 0 0 1 1.997-.406c.3.383.61.713.91.95c.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416c.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05a11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794c.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538a.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077c-.377.15-.576.47-.651.823c-.073.34-.04.736.046 1.136c.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227a7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787c-.21.326-.275.714-.08 1.103'
                    />
                </g>
            </svg>
        ),
        txt: (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1'
                />
            </svg>
        ),
        torrent: (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5'
                />
            </svg>
        ),
    };

    if (
        programmingExtensions.includes(
            extension.toLowerCase() as (typeof programmingExtensions)[number],
        )
    ) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zm2.708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8L8.646 6.354a.5.5 0 1 1 .708-.708'
                />
            </svg>
        );
    }

    if (imageExtensions.includes(extension.toLowerCase() as (typeof imageExtensions)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <g fill='currentColor'>
                    <path d='M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644l-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m4.002 5.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0' />
                    <path d='M10.564 8.27L14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577l2.56 1.536l2.426-3.395z' />
                </g>
            </svg>
        );
    }

    if (videoExtensions.includes(extension.toLowerCase() as (typeof videoExtensions)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z'
                />
            </svg>
        );
    }

    if (wordExtensions.includes(extension.toLowerCase() as (typeof wordExtensions)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5.485 4.879l1.036 4.144l.997-3.655a.5.5 0 0 1 .964 0l.997 3.655l1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z'
                />
            </svg>
        );
    }

    if (excelExtensions.includes(extension.toLowerCase() as (typeof excelExtensions)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5.884 4.68L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8L5.116 5.32a.5.5 0 1 1 .768-.64'
                />
            </svg>
        );
    }

    if (archiveExtensions.includes(extension.toLowerCase() as (typeof archiveExtensions)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <g fill='currentColor'>
                    <path d='M8.5 9.438V8.5h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243' />
                    <path d='M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m2.5 8.5v.938l-.4 1.599a1 1 0 0 0 .416 1.074l.93.62a1 1 0 0 0 1.109 0l.93-.62a1 1 0 0 0 .415-1.074l-.4-1.599V8.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1m1-5.5h-1v1h1v1h-1v1h1v1H9V6H8V5h1V4H8V3h1V2H8V1H6.5v1h1z' />
                </g>
            </svg>
        );
    }

    if (
        powerpointExtensions.includes(
            extension.toLowerCase() as (typeof powerpointExtensions)[number],
        )
    ) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <g fill='currentColor'>
                    <path d='M8.188 8.5H7V5h1.188a1.75 1.75 0 1 1 0 3.5' />
                    <path d='M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m3 4a1 1 0 0 0-1 1v6.5a.5.5 0 0 0 1 0v-2h1.188a2.75 2.75 0 0 0 0-5.5z' />
                </g>
            </svg>
        );
    }

    if (exeExtension.includes(extension.toLowerCase() as (typeof exeExtension)[number])) {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575zM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'
                />
            </svg>
        );
    }

    const icon = fileTypeMap[extension.toLowerCase()];

    return (
        icon || (
            <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 16 16'>
                <path
                    fill='currentColor'
                    d='M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1'
                />
            </svg>
        )
    );
};
