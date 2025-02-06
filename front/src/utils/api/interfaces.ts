export interface ResponseData<T = any> {
	message?: string;
	errors?: { [key: string]: string };
	data?: T;
	success: boolean;
}
