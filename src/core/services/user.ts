import { LoginRequest, OtpRequest } from "../types/Requests";
import mockUser from "~/core/mocks/user.json";
import mockOtp from "~/core/mocks/otp.json";

const baseUrl =
	"https://4c27-2800-4b0-430b-f5a0-c835-b17f-e988-cc0c.ngrok-free.app/api/v1.0";

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
