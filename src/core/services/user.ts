import { LoginRequest, OtpRequest } from "../types/Requests";
import mockUser from "~/core/mocks/user.json";
import mockOtp from "~/core/mocks/otp.json";
import { baseUrl } from "~/core/configs/base";


export const fetchUser = async (request: LoginRequest) =>
	fetch(`${baseUrl}/user/login-voter/`, {
		method: "POST",
		body: JSON.stringify(request),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.catch(() => mockUser);

export const fetchOtp = async (request: OtpRequest) =>
	fetch(`${baseUrl}/user/validate-otp/`, {
		method: "POST",
		body: JSON.stringify(request),
		headers: { "Content-type": "application/json; charset=UTF-8" },
	})
		.then((response) => response.json())
		.catch(() => mockOtp);
