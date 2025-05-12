export const calcSum = (bytes: number): string => {
    const gb = bytes / 1024 ** 3;

    if (gb >= 1024 ** 2) {
        // Петабайты
        return (gb / 1024 ** 2).toFixed(2) + ' Пб';
    } else if (gb >= 1024) {
        // Терабайты
        return (gb / 1024).toFixed(2) + ' Тб';
    } else {
        // Гигабайты
        return gb.toFixed(2) + ' Гб';
    }
};
