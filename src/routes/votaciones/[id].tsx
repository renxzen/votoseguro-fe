import { useI18n } from "@solid-primitives/i18n";
import Header from "~/components/Header";
import { useParams } from "solid-start";
import { fetchEntities } from "~/core/services/entity";
import { createResource } from "solid-js";
import { c } from "~/core/utils/c";
import { Entity } from "~/core/types/Entity";

const Main = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const [response] = createResource(fetchEntities);

	console.log(params.id);
	const entity: Entity = response()?.results.find(
		(entity: Entity) => entity.id === Number(params.id),
	);
	console.log(entity);

	return (
		<>
			<Header />
			<div class="flex flex-col">
				<div class="w-full max-h-52 overflow-hidden border-y border-coral">
					<img
						class="w-full"
						src={entity?.image}
					/>
				</div>
				<div class="flex flex-col gap-6 p-6 md:p-16">
					<p class="font-bold uppercase text-4xl">{entity?.name}</p>
					<div class="flex flex-row justify-between">
						<div class="flex-1 text-lg">
							<p class="inline">{t("votes.welcome")}</p>
							<p class="inline font-bold uppercase">{entity?.name}</p>
							<p class="inline">{t("votes.welcome-2")}</p>
							<p class="inline">{entity?.description}</p>
						</div>
						<div class="flex-1 grid place-items-center">
							<button
								class={c(
									"bg-coral py-3 px-16 text-white rounded-2xl font-bold text-4xl",
									"transition-all hover:scale-110",
								)}
							>
								{t("votes.login-button")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
