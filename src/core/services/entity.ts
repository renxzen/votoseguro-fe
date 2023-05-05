const baseUrl =
	"https://4c27-2800-4b0-430b-f5a0-c835-b17f-e988-cc0c.ngrok-free.app/api/v1.0";

const mockEntities = {
	count: 4,
	next: null,
	previous: null,
	results: [
		{
			id: 1,
			name: "Club de Regatas",
			ruc: "10741222766",
			description: "Votación del presidente del club",
			image: "https://i.imgur.com/KRC0rzU.png",
			address: "Jr. Vara de oro 193 4ta zona tahuantinsuyo",
		},
		{
			id: 3,
			name: "Lima Golf Club",
			ruc: "12345678912",
			description: "Votación del tesorero oficial.",
			image: "https://i.imgur.com/lFPN11G.png",
			address: "Av. Camino Real 770, San Isidro 15073",
		},
		{
			id: 5,
			name: "Club Lawn Tennis",
			ruc: "2073067761",
			description: "Votación para renovación de local.",
			image: "https://i.imgur.com/ISvAF1g.png",
			address: "Av. República de Chile 254, Jesús María 15072",
		},
		{
			id: 4,
			name: "Lima Cricket",
			ruc: "1073067761",
			description: "Repechaje de la división A2",
			image: "https://i.imgur.com/kU3MCo9.png",
			address: "Faustino Sánchez Carrión #200",
		},
	],
};

export const fetchEntities = async () =>
	fetch(`${baseUrl}/entity`)
		.then((response) => response.json())
		.catch(() => mockEntities);

/* export const fetchEntities = async () =>
	await Promise.resolve(); */

export const fetchCandidates = async () =>
	await Promise.resolve({
		count: 2,
		next: null,
		previous: null,
		results: [
			{
				id: 1,
				full_name: "Richard Cancino",
				image:
					"http://c5af-190-238-238-228.ngrok-free.app/media/candidates/None__RICHARD_CANCINO__292543349_462260685901694_6263011822499862470_n.jpeg",
				description: "Alcalde guapo",
				update_at: "2023-05-04",
				number_voters: 3,
				percentage_number_voters: "100.0%",
			},
			{
				id: 3,
				full_name: "Austin Ramirez",
				image:
					"http://c5af-190-238-238-228.ngrok-free.app/media/candidates/None__AUSTIN_RAMIREZ__292543349_462260685901694_6263011822499862470_n.jpeg",
				description: "Proplayer",
				update_at: "2023-05-04",
				number_voters: 0,
				percentage_number_voters: "0.0%",
			},
		],
	});
