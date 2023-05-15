export type User = {
	token: string;
	details: {
		full_name: string;
		dni: string;
	};
};

export type Authentication = {
	token: string;
	code: string;
};
