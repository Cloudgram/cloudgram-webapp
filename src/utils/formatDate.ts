export const dateFormat = (date: string) => new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});