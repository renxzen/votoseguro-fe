import { useI18n } from "@solid-primitives/i18n";
import { useParams } from "solid-start";
import Header from "~/components/Header";
import { createResource, createSignal } from "solid-js";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";

const Main = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const [response] = createResource(fetchEntities);
	const entity: Entity | undefined = response()?.results.find(
		(entity: Entity) => entity.id === Number(params.id),
	);

	return (
		<div class="h-screen">
			<Header />
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
