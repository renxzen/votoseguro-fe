import { useI18n } from "@solid-primitives/i18n";
import { useNavigate, useParams } from "solid-start";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { fetchCandidates, fetchEntities } from "~/core/services/entity";
import { Entity } from "~/core/types/Entity";
import Header from "~/components/Header";
import { Candidate, User } from "~/core/types/Responses";
import { fetchUser } from "~/core/services/user";
import { LoginRequest } from "~/core/types/Requests";
import { Loading } from "~/components/Loading";
import { c } from "~/core/utils/c";
import clock from "~/assets/svg/clock.svg";
import { getDateValues } from "~/core/utils/getDateValues";
import server$, {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server";

export const routeData = () => createServerData$(fetchCandidates);

const CandidatesPage = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [entity, setEntity] = createSignal({} as Entity);
	const [user, setUser] = createSignal({} as User);
	const [mode, setMode] = createSignal("loading");
	const [candidate, setCandidate] = createSignal(-1);
	const [candidates, setCandidates] = createSignal<Candidate[]>([]);

	const target = new Date();
	target.setHours(target.getHours() + 1);
	const countDownTarget = target.getTime();
	const [countDown, setCountDown] = createSignal("60:00");

	const interval = setInterval(() => {
		const { minutes, seconds } = getDateValues(
			countDownTarget - new Date().getTime(),
		);
		const paddedMinutes = minutes.toString().padStart(2, "0");
		const paddedSeconds = seconds.toString().padStart(2, "0");
		setCountDown(`${paddedMinutes}:${paddedSeconds}`);
	}, 1000);

	onCleanup(() => {
		clearInterval(interval);
	});

	const navigateBack = () => navigate("/votaciones", { replace: true });

	const checkUser = server$(async (user: User) => {
		const login: LoginRequest = {
			dni: user.details.dni,
			full_name: user.details.full_name,
		};
		const response = await fetchUser(login);
		if (response.status !== "successful") {
			return redirect("/votaciones");
		}

		return response;
	});

	const getCandidates = server$(async (entityId: string) => {
		const response = await fetchCandidates(entityId);
		return response;
	});

	const getEntities = server$(async () => {
		const response = await fetchEntities();
		return response;
	});

	createEffect(async () => {
		const entities = await getEntities();
		const ent = entities.find((en: Entity) => en.id === Number(params.id));
		const item = localStorage.getItem("user");
		if (!item || !ent) {
			navigateBack();
			return;
		}
		localStorage.removeItem("user");

		const user: User = JSON.parse(item);
		const loggedUser = await checkUser(user);
		localStorage.setItem("user", JSON.stringify(loggedUser));
		setUser(loggedUser);
		setEntity(ent);

		const candidatesResponse = await getCandidates(params.id);
		setCandidates(candidatesResponse);

		setMode("voting");
	});

	const getTemplate = () => {
		return (
			<>
				<div class="w-full max-h-52 overflow-hidden border-y border-coral">
					<img
						class="w-full"
						src={entity().image}
					/>
				</div>
				<div class="flex flex-col sm:flex-row justify-between">
					<div class="sm:w-500 flex flex-col gap-6 p-6 md:p-16">
						<p class="font-bold uppercase text-3xl sm:text-4xl">
							{entity().name}
						</p>
						<p class="text-base sm:text-lg">
							{t("candidates.subtitle")
								.replace("${entity_name}", entity().name)
								.replace("${description}", entity().description)}
						</p>
					</div>
					<div class="sm:w-500 flex flex-col p-6 md:p-16 gap-6">
						<p class="text-center">
							{t("candidates.welcome").replace(
								"${full_name}",
								user()?.details?.full_name,
							)}
						</p>
						<button
							class={c(
								"bg-coral py-2 px-12 text-white rounded-2xl self-center",
								"disabled:bg-grey disabled:text-black disabled:hover:scale-100",
								"transition-all hover:scale-110",
							)}
							onclick={() => setMode("voting")}
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
			</>
		);
	};

	const getContent = () => {
		switch (mode()) {
			case "loading":
				return <Loading />;
			case "preview":
				return (
					<div class="h-full flex flex-col">
						{getTemplate()}
						<div class="flex flex-col gap-12 mb-12">
							<p class="self-center pt-4 px-2 text-coral text-3xl font-bold border-t border-coral">
								{t("candidates.options-title")}
							</p>
							<div class="w-full flex flex-wrap justify-center gap-16">
								{candidates().map((candidate) => (
									<div class="self-start w-300 sm:w-350 flex flex-col items-center gap-4">
										<div class="w-4/6 h-64 sm:h-80 overflow-hidden">
											<img
												class="object-fill w-full h-64 sm:h-80"
												src={candidate.image}
											/>
										</div>
										<p class="uppercase font-bold">{candidate.full_name}</p>
										<p class="text-xs">{candidate.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				);
			case "voting":
				return (
					<div class="h-full flex flex-col">
						{getTemplate()}
						<div class="flex flex-col bg-coral px-8 py-10 gap-8 mb-12">
							<p class="text-white text-3xl">{t("candidates.voting-title")}</p>
							<div class="w-full flex flex-col gap-12">
								{candidates().map((cand) => (
									<div class="w-full grid grid-cols-3 gap-4 items-center bg-white rounded-2xl px-10 py-6">
										<p class="uppercase font-bold text-sm sm:text-base">{cand.full_name}</p>
										<div class="place-self-center w-16 h-16 sm:w-24 sm:h-24 overflow-hidden">
											<img
												class="object-fill w-16 h-16 sm:w-24 sm:h-24"
												src={cand.image}
											/>
										</div>
										<input
											class="place-self-end w-16 h-16 sm:w-24 sm:h-24"
											type="checkbox"
											onInput={(e) => {
											console.log(e.target.value);
											setCandidate(cand.id)}}
											checked={candidate() === cand.id}
										/>
									</div>
								))}
								<div class="w-full grid grid-cols-2 gap-4 items-center bg-white rounded-2xl px-10 py-6">
									<p class="uppercase font-bold">
										{t("candidates.null-title")}
									</p>
									<input
										class="place-self-end w-24 h-24"
										type="checkbox"
										oninput={() => setCandidate(0)}
										checked={candidate() === 0}
									/>
								</div>
							</div>
							<button
								class={c(
									"bg-blue py-2 px-12 text-white rounded-2xl self-center",
									"disabled:bg-grey disabled:text-black disabled:hover:scale-100",
									"transition-all hover:scale-110",
								)}
								disabled={candidate() < 0}
							>
								{t("candidates.submit-button")}
							</button>
						</div>
					</div>
				);
		}
	};

	return (
		<div class="h-screen">
			<Header />
			{getContent()}
		</div>
	);
};

export default CandidatesPage;
