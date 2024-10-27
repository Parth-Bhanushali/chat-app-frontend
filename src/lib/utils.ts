import { format, formatRelative, parseISO } from 'date-fns';
import { Alert } from 'react-native';
import { IRecipientActiveStatus } from '../types/custom';

export function timeAgo(isoDateString: string): string {
		const prefix = 'last seen ';
		const date = parseISO(isoDateString);
    return prefix + formatRelative(date, new Date());
}

export function pendingImplementationAlert(message: string) {
	Alert.alert('Pending Implementation', message);
}

export function formatOnlineStatus(isOnline: boolean, lastSeen: string): IRecipientActiveStatus {
	const newStatus = isOnline ? 'online' : timeAgo(lastSeen);
	return newStatus;
}

export function formatTime(dateString: string): string {
	const date = new Date(dateString);
	return format(date, 'HH:mm');
}
