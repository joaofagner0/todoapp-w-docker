import { Errors } from "@/utils/types/GenericErrorType";
import { fetchAPI } from "../api";
import { ResponseData } from "../interfaces";
import { Task } from "./interfaces";

export const store = async (
	title: string,
	description?: string
): Promise<ResponseData> => {
	return await fetchAPI('tasks', 'POST', { title, description });
};

export const get = async (): Promise<ResponseData<Task[]>> => {
	return await fetchAPI<Task[]>('tasks', 'GET');
};

export const update = async (
	id: string,
	title: string,
	completed: boolean,
	description?: string
): Promise<ResponseData<{ data: Task }>> => {
	return await fetchAPI<{ data: Task }>('tasks', 'PUT', {
		id,
		title,
		completed,
		description,
	});
};

export const destroy = async (
	id: string
): Promise<ResponseData<null>> => {
	return await fetchAPI<null>(`tasks/${id}`, 'DELETE');
};
