import { LoginRequest, OtpRequest } from "../types/Requests";

const baseUrl = "https://4c27-2800-4b0-430b-f5a0-c835-b17f-e988-cc0c.ngrok-free.app/api/v1.0";

export const fetchUser = async (request: LoginRequest) =>
	(
		await fetch(`${baseUrl}/user/login-voter/`, {
			method: "POST",
			body: JSON.stringify(request),
			headers: { "Content-type": "application/json; charset=UTF-8" },
		})
	).json();

/* export const fetchUser = async (request: LoginRequest) =>
	await Promise.resolve({
		status: "successful",
		msg: "Vontante activo, falta OTP",
		token: "57b34819f53986c6f08b5013ffe0e33b61e613c0",
		details: {
			full_name: "Richard Cancino",
			dni: "23123123",
		},
	}); */

export const fetchOtp = async (request: OtpRequest) =>
	(
		await fetch(`${baseUrl}/user/validate-otp/`, {
			method: "POST",
			body: JSON.stringify(request),
			headers: { "Content-type": "application/json; charset=UTF-8" },
		})
	).json();

/* export const fetchOtp = async (request: OtpRequest) =>
	await Promise.resolve({
		status: "successful",
		msg: "OTP validado",
		details: {
			token: "f419b99f5ae92d4873d54ed5183ecc9200f4c363",
			code: "1234",
		},
	}); */
