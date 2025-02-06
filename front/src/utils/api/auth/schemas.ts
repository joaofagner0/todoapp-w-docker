import { fetchAPI } from "../api";
import { AUTH_LOGIN_ENDPOINT, AUTH_REGISTER_ENDPOINT } from "./endpoints";

export const register = async (
	email: string,
	name: string,
	password: string,
	passwordConfirmation: string,
) => {
	return await fetchAPI(AUTH_REGISTER_ENDPOINT, 'POST', {
		email,
		name,
		password,
		password_confirmation: passwordConfirmation,
	});
};

export const login = async (
	email: string,
	password: string,
) => {
	return await fetchAPI(AUTH_LOGIN_ENDPOINT, 'POST', {
		email,
		password,
	});
};
