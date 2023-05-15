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

export type Candidate = {
	id: number;
	full_name: string;
	image: string;
	description: string;
	update_at: string;
	number_voters: number;
	percentage_number_voters: string;
};
