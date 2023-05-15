import { useI18n } from "@solid-primitives/i18n";
import { useNavigate, useParams } from "solid-start";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import Header from "~/components/Header";
import { User } from "~/core/types/Responses";
import { fetchUser } from "~/core/services/user";
import { LoginRequest } from "~/core/types/Requests";
import { Loading } from "~/components/Loading";
import { c } from "~/core/utils/c";
import clock from "~/assets/svg/clock.svg";
import { getDateValues } from "~/core/utils/getDateValues";

const CandidatesPage = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [loading, setLoading] = createSignal(true);
	const [entity, setEntity] = createSignal({} as Entity);
	const [user, setUser] = createSignal({} as User);

	const target = new Date();
	target.setHours(target.getHours() + 1);
	const countDownTarget = target.getTime();
	const [countDown, setCountDown] = createSignal(
		"60:00"
	);

	const interval = setInterval(() => {
		const {minutes, seconds} = getDateValues(countDownTarget - new Date().getTime());
		const paddedMinutes = minutes.toString().padStart(2, "0");
		const paddedSeconds = seconds.toString().padStart(2, "0");
		setCountDown(`${paddedMinutes}:${paddedSeconds}`);
	}, 1000);

	onCleanup(() => {
		clearInterval(interval);
	});

	const navigateBack = () => navigate("/votaciones", { replace: true });

	createEffect(async () => {
		const item = localStorage.getItem("user");
		if (!item) {
			navigateBack();
			return;
		}

		const user: User = JSON.parse(item);
		const login: LoginRequest = {
			dni: user.details.dni,
			full_name: user.details.full_name,
		};
		const response = await fetchUser(login);
		if (response.status !== "successful") {
			navigateBack();
			return;
		}
		setUser(user);

		const entities = await fetchEntities();
		const ent = entities.find((en: Entity) => en.id === Number(params.id));
		if (!ent) {
			navigateBack();
			return;
		}
		setEntity(ent);

		setLoading(false);
	});

	return (
		<div class="h-screen">
			<Header />
			{loading() ? (
				<Loading />
			) : (
				<div class="flex flex-col">
					<div class="w-full max-h-52 overflow-hidden border-y border-coral">
						<img
							class="w-full"
							src={entity().image}
						/>
					</div>
					<div class="flex justify-between">
						<div class="w-500 flex flex-col gap-6 p-6 md:p-16">
							<p class="font-bold uppercase text-3xl sm:text-4xl">
								{entity().name}
							</p>
							<p class="text-base sm:text-lg">
								{t("candidates.subtitle")
									.replace("${entity_name}", entity().name)
									.replace("${description}", entity().description)}
							</p>
						</div>
						<div class="w-500 flex flex-col p-6 md:p-16 gap-6">
							<p class="text-center">
								{t("candidates.welcome").replace(
									"${full_name}",
									user().details.full_name,
								)}
							</p>
							<button
								class={c(
									"bg-coral py-2 px-12 text-white rounded-2xl self-center",
									"disabled:bg-grey disabled:text-black disabled:hover:scale-100",
									"transition-all hover:scale-110",
								)}
							>
								<img
									class="h-8 inline"
									src={clock}
								/>
								<p class="inline ml-2">
									{t("candidates.timer-button").replace(
										"${time_left}",
										countDown(),
									)}
								</p>
							</button>
							<button
								class={c(
									"bg-coral py-2 px-12 text-white rounded-2xl self-center",
									"disabled:bg-grey disabled:text-black disabled:hover:scale-100",
									"transition-all hover:scale-110",
								)}
								disabled
							>
								{t("candidates.live-button")}
							</button>
							<button
								class={c(
									"bg-coral py-2 px-12 text-white rounded-2xl self-center",
									"disabled:bg-grey disabled:text-black disabled:hover:scale-100",
									"transition-all hover:scale-110",
								)}
								disabled
							>
								{t("candidates.results-button")}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CandidatesPage;
