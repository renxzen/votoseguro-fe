import mockEntities from "~/core/mocks/entities.json";
import mockCandidates from "~/core/mocks/candidates.json";

const baseUrl =
	"https://4c27-2800-4b0-430b-f5a0-c835-b17f-e988-cc0c.ngrok-free.app/api/v1.0";

export const fetchEntities = async () =>
	fetch(`${baseUrl}/entity`)
		.then((response) => response.json())
		.catch(() => mockEntities);
