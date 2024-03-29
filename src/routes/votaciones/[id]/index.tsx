import { useI18n } from "@solid-primitives/i18n";
import { useNavigate, useParams, useRouteData } from "solid-start";
import { createDeferred, createEffect, createSignal } from "solid-js";
import { fetchEntities } from "~/core/services/entity";
import { c } from "~/core/utils/c";
import { Entity } from "~/core/types/Entity";
import { User } from "~/core/types/Responses";
import { LoginRequest, OtpRequest } from "~/core/types/Requests";
import { fetchUser, fetchOtp } from "~/core/services/user";
import Header from "~/components/Header";
import server$, { createServerData$ } from "solid-start/server";
import { Loading } from "~/components/Loading";

export const routeData = () => createServerData$(fetchEntities);

const EntityPage = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();

	const navigateBack = () => navigate("/votaciones", { replace: true });
	const response = useRouteData<typeof routeData>();
	const entity = response()?.find((en: Entity) => en.id === Number(params.id));
	const [userLogged, setUserLogged] = createSignal(false);

	createEffect(() => {
		const item = localStorage.getItem("user");
		setUserLogged(Boolean(item));
	});

	createDeferred(() => {
		if (!entity) {
			navigateBack();
			return;
		}
	});

	const [mode, setMode] = createSignal("detail");
	const [dni, setDni] = createSignal("");
	const [otp, setOtp] = createSignal("");
	const [user, setUser] = createSignal({} as User);
	const [loading, setLoading] = createSignal(false);

	const login = server$(async (request: LoginRequest) => {
		const response = await fetchUser(request);
		return response;
	});

	const handleLogin = async () => {
		const request: LoginRequest = { dni: dni(), full_name: "none" };
		setLoading(true);
		const response = await login(request);
		setLoading(false);

		if (response.status !== "successful") {
			setDni("");
			alert("Credenciales incorrectos, intente nuevamente!");
			return;
		}

		const user: User = {
			token: response.token,
			details: {
				full_name: response.details.full_name,
				dni: response.details.dni,
			},
		};
		setUser(user);
		setMode("otp");
	};

	const goToCandidates = () => navigate(`/votaciones/${entity?.id}/candidatos`);

	const handleOtp = async () => {
		const request: OtpRequest = { code: otp(), token: user()?.token };
		const response = await fetchOtp(request);

		if (response.status === "error") {
			setOtp("");
			alert("Código incorrecto, intente nuevamente!");
			return;
		}

		localStorage.setItem("user", JSON.stringify(user()));
		localStorage.setItem("auth", JSON.stringify(response.details));
		goToCandidates();
	};

	const getMode = () => {
		switch (mode()) {
			case "detail":
				return (
					<div class="flex flex-col">
						<div class="w-full max-h-52 overflow-hidden border-y border-coral">
							<img
								class="w-full"
								src={entity?.image}
							/>
						</div>
						<div class="flex flex-col gap-6 p-6 md:p-16">
							<p class="font-bold uppercase text-3xl sm:text-4xl">
								{entity?.name}
							</p>
							<div class="flex flex-col gap-6 md:flex-row justify-between">
								<div class="flex-1 text-base sm:text-lg">
									<p>
										{t("votes.welcome")
											.replace("${entity_name}", entity?.name)
											.replace("${description}", entity?.description)}
									</p>
								</div>
								<div class="flex-1 grid place-items-center">
									{userLogged() ? (
										<button
											class={c(
												"bg-coral py-3 px-16 text-white rounded-2xl font-bold text-2xl sm:text-4xl",
												"transition-all hover:scale-110",
											)}
											onclick={goToCandidates}
										>
											{t("votes.vote")}
										</button>
									) : (
										<button
											class={c(
												"bg-coral py-3 px-16 text-white rounded-2xl font-bold text-2xl sm:text-4xl",
												"transition-all hover:scale-110",
											)}
											onclick={() => setMode("login")}
										>
											{t("votes.login.button")}
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			case "login":
				return (
					<div class="h-full w-full bg-coral grid place-items-center">
						<div class="sm:w-500 bg-white px-8 py-4 flex flex-col gap-6 rounded-3xl">
							<p class="font-bold uppercase text-center text-2xl">
								{entity?.name}
							</p>
							<p class="border-b border-coral">{t("votes.login.start")}</p>
							<div class="w-full">
								<div class="w-full md:w-1/2 flex flex-col gap-1">
									<p class="font-bold text-gray-400">{t("votes.login.id")}</p>
									<input
										type="number"
										class="border border-black outline-none py-1 px-2"
										placeholder={t("votes.login.id-placeholder")}
										value={dni()}
										oninput={(e) => setDni(e.target.value)}
										onKeyPress={(e) =>
											e.key === "Enter" && dni().length >= 8 && handleLogin()
										}
									/>
								</div>
							</div>
							<div class="grid place-items-center">
								<button
									class={c(
										"bg-coral py-2 px-12 text-white rounded-2xl font-bold text-xl disabled:bg-grey",
										"transition-all hover:scale-110",
									)}
									onclick={() => handleLogin()}
									disabled={dni().length < 8 || loading()}
								>
									{loading()
										? t("votes.login.loading")
										: t("votes.login.button")}
								</button>
							</div>
						</div>
					</div>
				);
			case "otp":
				return (
					<div class="h-full w-full bg-coral grid place-items-center">
						<div class="max-w-350 sm:max-w-500 bg-white px-8 py-4 flex flex-col gap-6 rounded-3xl">
							<p class="font-bold uppercase text-center text-lg sm:text-2xl border-b border-coral">
								{entity?.name}
							</p>
							<div class="w-full flex flex-col sm:flex-row gap-6">
								<p class="sm:w-1/2 text-sm">
									{t("votes.otp.message")?.replace(
										"${full_name}",
										user().details.full_name,
									)}
								</p>
								<div class="sm:w-1/2 flex flex-col items-center justify-center gap-3">
									<input
										class="w-full border border-black outline-none py-1 px-2"
										type="number"
										value={otp()}
										oninput={(e) => setOtp(e.target.value)}
										onKeyPress={(e) =>
											e.key === "Enter" && otp().length >= 4 && handleOtp()
										}
									/>
									<button
										class={c(
											"bg-coral py-2 px-12 text-white rounded-2xl font-bold text-xl disabled:bg-grey",
											"transition-all hover:scale-110",
										)}
										onclick={() => handleOtp()}
										disabled={otp().length < 4 || loading()}
									>
										{loading()
											? t("votes.login.loading")
											: t("votes.login.button")}
									</button>
								</div>
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<div class="h-screen">
			<Header />
			{entity ? getMode() : <Loading />}
		</div>
	);
};

export default EntityPage;
