import { baseUrl } from "~/core/configs/base";
import mockEntities from "~/core/mocks/entities.json";
import { Entity } from "../types/Entity";

export const fetchEntities = async (): Promise<Entity[]> =>
	fetch(`${baseUrl}/entity/`)
		.then((response) => response.json())
		.then((response: { results: Entity[] }) => response.results)
		.catch(() => mockEntities.results);
