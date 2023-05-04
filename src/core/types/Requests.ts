export type LoginRequest = {
	full_name: string,
	dni: string,
}

export type OtpRequest = {
	code: string,
	token: string,
}

export type VoteRequest = {
	voter_token: string,
	candidate: number,
}
