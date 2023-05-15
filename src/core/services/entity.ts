import { baseUrl } from "~/core/configs/base";
import mockEntities from "~/core/mocks/entities.json";
import mockCandidates from "~/core/mocks/candidates.json";
import { Entity } from "../types/Entity";
import { Candidate } from "../types/Responses";

export const fetchEntities = async (): Promise<Entity[]> =>
	fetch(`${baseUrl}/entity/`)
		.then((response) => response.json())
		.then((response: { results: Entity[] }) => response.results)
		.catch(() => mockEntities.results);

export const fetchCandidates = async (entityId: string): Promise<Candidate[]> =>
	fetch(`${baseUrl}/entity/${entityId}/candidates`)
		.then((response) => response.json())
		.then((response: { results: Candidate[] }) => response.results)
		.catch(() => mockCandidates.results);
