export function formatDate(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year: string = String(date.getFullYear());

    return `${day}/${month}/${year}`;
}
