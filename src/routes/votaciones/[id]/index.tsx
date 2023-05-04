import { useI18n } from "@solid-primitives/i18n";
import Header from "~/components/Header";
import { useNavigate, useParams } from "solid-start";
import { fetchEntities } from "~/core/services/entity";
import { createResource, createSignal } from "solid-js";
import { c } from "~/core/utils/c";
import { Entity } from "~/core/types/Entity";
import { Authentication, User } from "~/core/types/Responses";
import { LoginRequest, OtpRequest } from "~/core/types/Requests";
import { fetchUser, fetchOtp } from "~/core/services/user";

const Main = () => {
	const [t] = useI18n();
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [response] = createResource(fetchEntities);
	const entity: Entity | undefined = response()?.results.find(
		(entity: Entity) => entity.id === Number(params.id),
	);

	// detail -> login -> otp -> redirect()
	const [mode, setMode] = createSignal("detail");

	const [dni, setDni] = createSignal("");
	const [otp, setOtp] = createSignal("");
	const [user, setUser] = createSignal({} as User);
	// const [user] = createResource(loginRequest, fetchUser);

	const handleLogin = async () => {
		const request: LoginRequest = { dni: dni(), full_name: "none" };
		const response = await fetchUser(request);
		setUser(response);
		console.log(user());

		setMode("otp");
	};

	const handleOtp = async () => {
		const request: OtpRequest = { code: otp(), token: user()?.token };
		const response = await fetchOtp(request);
		console.log(response);

		window.localStorage.setItem("auth", JSON.stringify(response.details));
		navigate("/about", { replace: true });
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
							<p class="font-bold uppercase text-4xl">{entity?.name}</p>
							<div class="flex flex-row justify-between">
								<div class="flex-1 text-lg">
									<p>
										{t("votes.welcome")
											.replace("_entity_name_", entity?.name)
											.replace("_description_", entity?.description)}
									</p>
								</div>
								<div class="flex-1 grid place-items-center">
									<button
										class={c(
											"bg-coral py-3 px-16 text-white rounded-2xl font-bold text-4xl",
											"transition-all hover:scale-110",
										)}
										onclick={() => setMode("login")}
									>
										{t("votes.login.button")}
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			case "login":
				return (
					<div class="h-full w-full bg-coral grid place-items-center">
						<div class="w-500 bg-white px-8 py-4 flex flex-col gap-6 rounded-3xl">
							<p class="font-bold uppercase text-center text-2xl">
								{entity?.name}
							</p>
							<p class="border-b border-coral">{t("votes.login.start")}</p>
							<div class="w-full">
								<div class="w-full md:w-1/2 flex flex-col gap-1">
									<p class="font-bold text-gray-400">{t("votes.login.id")}</p>
									<input
										class="border border-black outline-none py-1 px-2"
										placeholder={t("votes.login.id-placeholder")}
										value={dni()}
										oninput={(e) => setDni(e.target.value)}
									/>
								</div>
							</div>
							<div class="grid place-items-center">
								<button
									class={c(
										"bg-coral py-2 px-12 text-white rounded-2xl font-bold text-xl",
										"transition-all hover:scale-110",
									)}
									onclick={() => handleLogin()}
								>
									{t("votes.login.button")}
								</button>
							</div>
						</div>
					</div>
				);
			case "otp":
				return (
					<div class="h-full w-full bg-coral grid place-items-center">
						<div class="w-500 bg-white px-8 py-4 flex flex-col gap-6 rounded-3xl">
							<p class="font-bold uppercase text-center text-2xl border-b border-coral">
								{entity?.name}
							</p>
							<div class="w-full flex flex-row gap-6">
								<p class="w-1/2 text-sm">
									{t("votes.otp.message")?.replace(
										"_full_name_",
										user().details.full_name,
									)}
								</p>
								<div class="w-1/2 flex flex-col items-center justify-center gap-3">
									<input
										class="w-full border border-black outline-none py-1 px-2"
										value={otp()}
										oninput={(e) => setOtp(e.target.value)}
									/>
									<button
										class={c(
											"bg-coral py-2 px-12 text-white rounded-2xl font-bold text-xl",
											"transition-all hover:scale-110",
										)}
										onclick={() => handleOtp()}
									>
										{t("votes.login.button")}
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
			{getMode()}
		</div>
	);
};

export default Main;
