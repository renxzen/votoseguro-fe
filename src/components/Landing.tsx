import { useI18n } from "@solid-primitives/i18n";
import { createSignal, onCleanup } from "solid-js";
// import vote from "../../public/svg/vote.svg";
import { Indicator } from "../core/types/Indicator";
import { c } from "../core/utils/c";

const Main = () => {
	const [t] = useI18n();
	const [received, setReceived] = createSignal(180783);
	const [total, setTotal] = createSignal(1290);
	const [clients, setClients] = createSignal(354);

	const getNumber = (indicator: string) => {
		switch (indicator) {
			case "received":
				return received();
			case "total":
				return total();
			case "clients":
				return clients();
			default:
				0;
		}
	};

	const receivedTimer = setInterval(
		() => setReceived(received() + Math.floor(Math.random() * 10)),
		2000,
	);
	const totalTimer = setInterval(
		() => setTotal(total() + Math.floor(Math.random() * 10)),
		2500,
	);
	const clientsTimer = setInterval(
		() => setClients(clients() + Math.floor(Math.random() * 10)),
		5000,
	);

	onCleanup(() => {
		clearInterval(receivedTimer);
		clearInterval(totalTimer);
		clearInterval(clientsTimer);
	});

	return (
		<main class="h-[calc(100vh-74px)] w-100 flex flex-col-reverse md:flex-row gap-13 items-center md:justify-between bg-coral md:py-16">
			<div
				class={c(
					"bg-white px-5 grid grid-cols-1 grid-rows-3 gap-3 py-12 rounded-t-3xl",
					"sm:grid-cols-3 sm:grid-rows-1",
					"md:px-11 md:grid-cols-1 md:grid-rows-3 md:self-center md:py-24 md:text-center md:gap-24 md:rounded-tl-none md:rounded-r-3xl",
				)}
			>
				{t("main.indicators").map((item: Indicator) => (
					<div class="w-48 flex flex-col gap-1 sm:gap-3 text-center">
						<p class="text-3xl sm:text-4xl lg:text-5xl">
							{getNumber(item.indicator)?.toLocaleString()}
						</p>
						<p class="text-base sm:text-lg lg:text-xl text-coral">
							{item.name}
						</p>
					</div>
				))}
			</div>
			<div class="flex flex-col justify-center flex-grow">
				<div class="flex justify-center items-center">
					<p class="w-300 max-w-500 text-white md:pb-56 text-2xl sm:text-4xl font-bold text-right">
						{t("main.title")}
					</p>
					<img
						class="w-1/2 max-w-500"
						src="svg/vote.svg"
					/>
				</div>
				<div class="grid place-items-center py-6">
					<button class="bg-white px-4 py-1 rounded-full">
						{t("main.call-to-action")}
					</button>
				</div>
			</div>
		</main>
	);
};

export default Main;
