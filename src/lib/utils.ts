import { formatRelative, parseISO } from 'date-fns';

export function timeAgo(isoDateString: string): string {
		const prefix = 'Last seen ';
		const date = parseISO(isoDateString);
    return prefix + formatRelative(date, new Date());
};