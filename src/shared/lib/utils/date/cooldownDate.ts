export const cooldownDate = (date: string) => {
    const now = new Date();
    const endDate = new Date(date);
    const diff = endDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const getDaysString = (number: number) => {
        const lastDigit = Math.abs(number % 10);
        const lastTwoDigits = Math.abs(number % 100);

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней';
        if (lastDigit === 1) return 'день';
        if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
        return 'дней';
    };

    return `${days} ${getDaysString(days)}`;
};
