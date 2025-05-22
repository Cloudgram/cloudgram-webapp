export const dateFormat = (date: Date) =>
    new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
