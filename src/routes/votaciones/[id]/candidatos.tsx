import { useI18n } from "@solid-primitives/i18n";
import { useNavigate, useParams, useRouteData } from "solid-start";
import { createEffect, createSignal } from "solid-js";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import Header from "~/components/Header";
import { Authentication } from "~/core/types/Responses";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { fetchUser } from "~/core/services/user";
import { LoginRequest } from "~/core/types/Requests";
import { Loading } from "~/components/Loading";

export const routeData = () => createServerData$(fetchEntities);

const Main = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [loading, setLoading] = createSignal(true);

	const response = useRouteData<typeof routeData>();
	const entity: Entity | undefined = response()?.find(
		(entity: Entity) => entity.id === Number(params.id),
	);

	createEffect(async () => {
		const item = localStorage.getItem("login");
		if (!item) {
			navigate(`/votaciones/${params.id}`, { replace: true });
			return;
		}

		const login: LoginRequest = JSON.parse(item);
		const response = await fetchUser(login);
		if (response.status !== "successful") {
			navigate(`/votaciones/${params.id}`, { replace: true });
			return;
		}

		setLoading(false);
	});

	return (
		<div class="h-screen">
			<Header />
			{loading() ? (
				<Loading />
			) : (
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
										.replace("${entity_name}", entity?.name)
										.replace("${description}", entity?.description)}
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
			)}
		</div>
	);
};

export default Main;
