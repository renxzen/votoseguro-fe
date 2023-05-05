import { baseUrl } from "~/core/configs/base";
import mockEntities from "~/core/mocks/entities.json";
import mockCandidates from "~/core/mocks/candidates.json";

export const fetchEntities = async () =>
	fetch(`${baseUrl}/entity`)
		.then((response) => response.json())
		.catch(() => mockEntities);
