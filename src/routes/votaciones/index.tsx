import { useI18n } from "@solid-primitives/i18n";
import { createEffect, createResource, createSignal } from "solid-js";
import Header from "~/components/Header";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import { c } from "~/core/utils/c";
import moment from "moment";
import clock from "~/assets/svg/clock.svg";
import search from "~/assets/svg/search.svg";
import cross from "~/assets/svg/cross.svg";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

export const routeData = () => createServerData$(fetchEntities);

const EntitiesPage = () => {
	const [t] = useI18n();
	const response = useRouteData<typeof routeData>();
	const initialEntities = response()!;
	const [entities, setEntities] = createSignal(initialEntities);
	const [input, setInput] = createSignal("");

	createEffect(() => {
		if (!input()) setEntities(initialEntities);

		setEntities(
			initialEntities?.filter((entity: Entity) =>
				entity.name
					.replace(" ", "")
					.toLowerCase()
					.includes(input().toLowerCase().replace(" ", "")),
			),
		);
	});

	return (
		<>
			<Header />
			<div class="h-[calc(100vh-74px)] w-full flex flex-col gap-6 mb-8">
				<div
					class={c(
						"w-100 bg-coral flex flex-col p-8 gap-4",
						"md:flex-row md:justify-between",
					)}
				>
					<p class="text-white text-3xl md:text-4xl font-bold">
						{t("votes.title")}
					</p>
					<div class="flex items-center gap-4">
						<img
							class="h-6"
							src={search}
						/>
						<div class="flex relative w-full">
							<input
								type="text"
								class="rounded-full px-4 py-2 outline-none w-full"
								placeholder={t("votes.placeholder")}
								value={input()}
								oninput={(e) => setInput(e.target.value)}
							/>
							{input() && (
								<button
									class="absolute right-5 h-full grid place-items-center"
									onclick={() => setInput("")}
								>
									<img
										class="h-4"
										src={cross}
									/>
								</button>
							)}
						</div>
					</div>
				</div>
				<div
					class={c(
						"w-full flex flex-wrap justify-center gap-8",
						"md:items-center md:gap-24",
					)}
				>
					{entities()?.map((entity) => (
						<a href={`/votaciones/${entity.id}`}>
							<div class="bg-grey rounded-3xl transition-transform hover:scale-110">
								<div class="w-300 max-h-40 overflow-hidden border border-coral rounded-3xl">
									<img
										class="w-300 object-cover object-center"
										src={entity.image}
									/>
								</div>
								<div class="pt-1 pb-3 px-3 break-all w-full flex flex-col gap-1">
									<p class="font-bold uppercase">{entity.name}</p>
									<p class="text-xs">{entity.description}</p>
									<div class="text-xs self-end">
										<img
											class="inline w-4"
											src={clock}
										/>
										<p class="inline">
											{`${moment().format("D/MM/YY")} 9:00 AM - 10:00 PM`}
										</p>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</>
	);
};

export default EntitiesPage;
