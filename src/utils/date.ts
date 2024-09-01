import { format, parseISO } from 'date-fns';

export function formatDateTime(timestamp: string): string {
  return format(new Date(timestamp), 'dd.MM.yyyy, H:mm');
}

export function getHumanReadableDate(date: string): string {
  return format(parseISO(date), 'MMM dd, yyyy');
}
