export const ASYNC_STORAGE_USER_KEY = '@user';

// Not recommended, but as per the current usage it's safe to use.
// Consider refactoring the code in near future to mitigate it.
export const logsSafeToIgnore: string[] = [
	'Require cycle: src\\api\\api.ts -> src\\services\\apiService.ts -> src\\api\\api.ts',
];
