import { useI18n } from "@solid-primitives/i18n";
import { createResource } from "solid-js";
import Header from "~/components/Header";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import { c } from "~/core/utils/c";
import moment from "moment";
import clock from "~/assets/svg/clock.svg";

const Main = () => {
	const [t] = useI18n();
	const [entities] = createResource(fetchEntities);

	return (
		<>
			<Header />
			<div class="h-[calc(100vh-74px)] w-full grid place-items-center">
				<div class="w-full flex flex-wrap md:items-center justify-center gap-8 md:gap-24">
					{entities()?.results?.map((entity: Entity) => (
						<div class="bg-grey rounded-3xl">
							<div class="w-300 max-h-40 overflow-hidden border border-coral rounded-3xl">
								<img src={entity.image} />
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
					))}
				</div>
			</div>
		</>
	);
};

export default Main;
