import { useI18n } from "@solid-primitives/i18n";
import { useNavigate, useParams } from "solid-start";
import { createResource } from "solid-js";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import Header from "~/components/Header";
import { Authentication } from "~/core/types/Responses";
import { createServerAction$, redirect } from "solid-start/server";
import { fetchUser } from "~/core/services/user";
import { LoginRequest } from "~/core/types/Requests";

const Main = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [response] = createResource(fetchEntities);
	const entity: Entity | undefined = response()?.find(
		(entity: Entity) => entity.id === Number(params.id),
	);

	const [checking, check] = createServerAction$(async (json: string | null) => {
		const request: LoginRequest | undefined = JSON.parse(json || "");
		if (!request) return redirect(`/votaciones/${params.id}`);

		const response = await fetchUser(request);
		console.log(response);
		// return redirect(`/votaciones/${params.id}`);
	});

	// const item = sessionStorage.getItem("auth");
	// if (!item) {
	// 	navigate("/votaciones", { replace: true });
	// }
	// const auth: Authentication = JSON.parse(item!)
	// console.log(auth)
	
	check(sessionStorage.getItem("login"));

	return (
		<div class="h-screen">
			<Header />
			{checking.pending}
			<div class="h-full">
				<div class="w-full max-h-52 overflow-hidden border-y border-coral">
					<img
						class="w-full"
						src={entity?.image}
					/>
					<div>
						<div>
							<p class="font-bold uppercase text-4xl">{entity?.name}</p>
							<p>
								{t("candidates.subtitle")
									.replace("_entity_name_", entity?.name)
									.replace("_description_", entity?.description)}
							</p>
						</div>
						<div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
