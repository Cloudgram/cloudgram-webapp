// const maxLength = 20;
export const cutTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    }
    return title;
}