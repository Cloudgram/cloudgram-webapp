export const calcSum = (bytes: number): string => {
    const gb = bytes / 1024 ** 3;

    if (gb >= 1024 ** 2) {
        // Петабайты
        return (gb / 1024 ** 2).toFixed(1) + ' Пб';
    } else if (gb >= 1024) {
        // Терабайты
        return (gb / 1024).toFixed(1) + ' Тб';
    } else {
        // Гигабайты
        return gb.toFixed(0) + ' Гб';
    }
};
