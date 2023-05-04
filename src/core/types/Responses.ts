export type User = {
	token: string;
	details: {
		full_name: string;
		dni: string;
	};
};

export type Authentication = {
	status: string;
	details: {
		token: string;
		code: string;
	};
};
