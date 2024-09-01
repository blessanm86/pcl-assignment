import { format, parseISO } from 'date-fns';

export function formatISODateTime(timestamp: string): string {
  return format(new Date(timestamp), 'dd.MM.yyyy, H:mm');
}

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMM dd, yyyy');
}
